import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from './supabase';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

// In-memory fallback for Vercel when Supabase environment variables are pending setup
let memoryStore: any = null;

function getLocalFileData() {
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
    console.error('Error reading local db.json:', error);
  }
  return memoryStore;
}

export async function getDbData() {
  // If Supabase is configured, fetch live content from Supabase
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
        console.warn(`Supabase SELECT notice [${error.code}]: ${error.message}`);
      }

      // Seed main row to Supabase if table exists but row is missing
      const defaultData = getLocalFileData();
      if (defaultData) {
        await supabase.from('store_content').upsert({
          id: 'main',
          data: defaultData,
          updated_at: new Date().toISOString(),
        });
        return defaultData;
      }
    } catch (err: any) {
      console.warn('Supabase fetch notice, using fallback store:', err?.message);
    }
  }

  // Fallback to in-memory store or local file
  const localData = getLocalFileData();
  if (!localData) {
    throw new Error('Database data could not be loaded');
  }
  return localData;
}

export async function saveDbData(data: any) {
  // Always update memory store immediately
  memoryStore = data;

  // If Supabase is configured, save directly to Supabase table
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('store_content').upsert({
        id: 'main',
        data: data,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error(`Supabase UPSERT error [${error.code}]: ${error.message}`);
        throw new Error(`Supabase Save Error: ${error.message}`);
      }

      return true;
    } catch (err: any) {
      console.error('Supabase save error:', err);
      throw err;
    }
  }

  // Attempt local disk save (works in local dev, gracefully ignored on serverless)
  try {
    const dirPath = path.dirname(DB_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err: any) {
    console.warn(`Serverless environment file write skipped: ${err?.message}`);
  }

  return true;
}
