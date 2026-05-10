import { supabase } from "../../shared/lib/supabase";

export async function getSession() {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export async function signInWithPassword(email: string, password: string) {
  if (!supabase) {
    throw new Error("Supabase non configurato. Compila VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.");
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }

  return data.session;
}

export async function signUpWithPassword(email: string, password: string) {
  if (!supabase) {
    throw new Error("Supabase non configurato. Compila VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.");
  }

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw error;
  }

  return data.session;
}

export async function signOut() {
  if (!supabase) {
    return;
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}
