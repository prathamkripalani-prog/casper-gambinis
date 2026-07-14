import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("SUPABASE URL:", url);
console.log("SUPABASE KEY EXISTS:", !!key);

export const supabase = createClient(url!, key!);