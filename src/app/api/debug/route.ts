import { NextResponse } from 'next/server';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const hasUrl = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  );
  const hasKey = Boolean(
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY
  );

  let supabaseError = null;
  let rowFound = false;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('store_content')
        .select('id')
        .eq('id', 'main')
        .single();

      if (error) {
        supabaseError = {
          code: error.code,
          message: error.message,
          details: error.details,
        };
      } else if (data) {
        rowFound = true;
      }
    } catch (err: any) {
      supabaseError = err?.message || 'Query thrown error';
    }
  }

  return NextResponse.json({
    hasUrl,
    hasKey,
    isSupabaseConfigured,
    rowFound,
    supabaseError,
    timestamp: new Date().toISOString(),
  });
}
