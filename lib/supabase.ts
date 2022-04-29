import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://blgqnqffsrffdnkqkfjd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsZ3FucWZmc3JmZmRua3FrZmpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDg4Nzc5ODIsImV4cCI6MTk2NDQ1Mzk4Mn0.Ne-yAj2QMTnfOZesieB7hMbOiSIt_sqhvfad6GQ-t6w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});
