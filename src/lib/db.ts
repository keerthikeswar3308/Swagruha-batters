import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from './supabase';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

function getLocalFileData() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const rawData = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(rawData);
    }
  } catch (error) {
    console.error('Error reading local db.json:', error);
  }
  return null;
}

export async function getDbData() {
  // If Supabase is configured, ALWAYS fetch live content from Supabase
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('store_content')
      .select('data')
      .eq('id', 'main')
      .single();

    if (!error && data && data.data) {
      return data.data;
    }

    if (error) {
      console.error(`Supabase SELECT error [${error.code}]: ${error.message}`);
    }

    // If main row does not exist in Supabase yet, seed it automatically from default schema
    const defaultData = getLocalFileData();
    if (defaultData) {
      const { error: seedError } = await supabase.from('store_content').upsert({
        id: 'main',
        data: defaultData,
        updated_at: new Date().toISOString(),
      });
      if (!seedError) {
        return defaultData;
      }
    }

    throw new Error(`Failed to fetch store content from Supabase: ${error?.message || 'Unknown error'}`);
  }

  // Fallback to local JSON file only when Supabase is not configured (local dev)
  const localData = getLocalFileData();
  if (!localData) {
    throw new Error('Database data could not be loaded from local disk or Supabase');
  }
  return localData;
}

export async function saveDbData(data: any) {
  // If Supabase is configured, ALWAYS save directly to Supabase table
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('store_content').upsert({
      id: 'main',
      data: data,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error(`Supabase UPSERT error [${error.code}]: ${error.message}`);
      throw new Error(`Failed to save store content to Supabase: ${error.message}`);
    }

    return true;
  }

  // Fallback to local disk save only when Supabase is not configured (local dev)
  try {
    const dirPath = path.dirname(DB_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err: any) {
    throw new Error(`Failed to save data to local file: ${err.message}`);
  }
}
