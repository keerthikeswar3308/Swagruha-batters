import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from './supabase';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

function getFallbackFileData() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const rawData = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(rawData);
    }
  } catch (error) {
    console.error('Error reading fallback db.json:', error);
  }
  return null;
}

export async function getDbData() {
  // If Supabase is configured, fetch from Supabase table
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('store_content')
        .select('data')
        .eq('id', 'main')
        .single();

      if (!error && data && data.data) {
        return data.data;
      }

      // Seed initial data to Supabase if main row is not found
      const fallbackData = getFallbackFileData();
      if (fallbackData) {
        await supabase.from('store_content').upsert({
          id: 'main',
          data: fallbackData,
          updated_at: new Date().toISOString(),
        });
        return fallbackData;
      }
    } catch (err) {
      console.error('Supabase fetch error, using local fallback:', err);
    }
  }

  // Fallback to local file
  const localData = getFallbackFileData();
  if (!localData) {
    throw new Error('Database data could not be loaded');
  }
  return localData;
}

export async function saveDbData(data: any) {
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
        console.error('Supabase save error:', error);
      }
    } catch (err) {
      console.error('Supabase save error:', err);
    }
  }

  // Attempt local disk save (works in local dev, ignored if Vercel serverless filesystem is read-only)
  try {
    const dirPath = path.dirname(DB_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    // If on serverless and Supabase saved successfully, ignore filesystem read-only error
    if (!savedToSupabase && isSupabaseConfigured) {
      console.warn('Local file write skipped in serverless environment.');
    } else if (!savedToSupabase && !isSupabaseConfigured) {
      throw new Error('Failed to save data. Please configure Supabase environment variables on Vercel.');
    }
  }

  return true;
}
