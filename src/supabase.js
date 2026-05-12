import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nokvsmozzmdbtgzfficl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5va3ZzbW96em1kYnRnemZmaWNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1Nzk3NDYsImV4cCI6MjA5NDE1NTc0Nn0.MG0mK3ZNaUNUEn1DaH2PLQJKP7PkXg2EGBRTncDMYkQ";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);