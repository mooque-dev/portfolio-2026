import { createClient } from "@supabase/supabase-js";

// Graceful degradation: if env vars aren't set, the gateway still works —
// it just won't show other visitors' responses.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured =
  typeof supabaseUrl === "string" &&
  supabaseUrl.length > 0 &&
  typeof supabaseAnonKey === "string" &&
  supabaseAnonKey.length > 0;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export interface GatewayResponse {
  id: string;
  question_id: string;
  answer: string;
  display_name: string | null;
  created_at: string;
}
