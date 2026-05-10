import { createClient } from "@supabase/supabase-js";
import { appConfig } from "../../app/config";
import type { Database } from "../types/database.types";

export const isSupabaseConfigured = Boolean(appConfig.supabaseUrl && appConfig.supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient<Database>(appConfig.supabaseUrl, appConfig.supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
