import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://umryooifjtwokxeybbxc.supabase.co/";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtcnlvb2lmanR3b2t4ZXliYnhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNzY0NjcsImV4cCI6MjA0Njc1MjQ2N30._nrt3TP_ZO6sbzQe9Jbv6GR8TW8ll1ttgLj7QF204Y4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
