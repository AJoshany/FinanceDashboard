import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rtnxfvrblednxcsezekl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0bnhmdnJibGVkbnhjc2V6ZWtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczOTc4OTAsImV4cCI6MjA3Mjk3Mzg5MH0.ajBssoHYXck_zR_HjV485s8y-8PM5zjkv1IOx-8poBU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
