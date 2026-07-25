import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from './supabase';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

// Global in-memory cache for serverless fallback
let memoryStore: any = null;

function getFallbackFileData() {
  if (memoryStore) {
    return memoryStore;
  }
  try {
    if (fs.existsSync(DB_PATH)) {
      const rawData = fs.readFileSync(DB_PATH, 'utf-8');
      memoryStore = JSON.parse(rawData);
      return memoryStore;
    }
  } catch (error) {
    console.error('Error reading fallback db.json:', error);
  }
  return memoryStore;
}

export async function getDbData() {
  // Try fetching from Supabase table first if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('store_content')
        .select('data')
        .eq('id', 'main')
        .single();

      if (!error && data && data.data) {
        memoryStore = data.data;
        return data.data;
      }

      if (error) {
        // Log PostgREST or missing table error gracefully (e.g. PGRST125 / 42P01)
        console.warn(`Supabase notice [${error.code}]: ${error.message}`);
      }

      // If table exists but main row missing, attempt to seed it
      const fallbackData = getFallbackFileData();
      if (fallbackData && (!error || error.code === 'PGRST116')) {
        await supabase.from('store_content').upsert({
          id: 'main',
          data: fallbackData,
          updated_at: new Date().toISOString(),
        });
        return fallbackData;
      }
    } catch (err) {
      console.warn('Supabase query error, falling back to memory store:', err);
    }
  }

  // Return memoryStore or local seed JSON
  const localData = getFallbackFileData();
  if (!localData) {
    throw new Error('Database data could not be loaded');
  }
  return localData;
}

export async function saveDbData(data: any) {
  // Always update memory store immediately
  memoryStore = data;
  let savedToSupabase = false;

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('store_content').upsert({
        id: 'main',
        data: data,
        updated_at: new Date().toISOString(),
      });

      if (!error) {
        savedToSupabase = true;
      } else {
        console.warn(`Supabase save notice [${error.code}]: ${error.message}`);
        // If table doesn't exist yet (PGRST125 / 42P01), log helpful instruction
        if (error.code === 'PGRST125' || error.code === '42P01' || error.message.includes('does not exist')) {
          console.warn(
            'Action required: Run supabase_schema.sql in your Supabase SQL Editor to enable persistent multi-session storage.'
          );
        }
      }
    } catch (err) {
      console.warn('Supabase save error:', err);
    }
  }

  // Attempt local disk save (works in local dev, gracefully ignored on serverless)
  try {
    const dirPath = path.dirname(DB_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    // Gracefully handle Vercel read-only filesystem
    console.log('Serverless environment file write skipped.');
  }

  return true;
}
