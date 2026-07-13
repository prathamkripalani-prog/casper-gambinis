import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("food_categories")
    .select("*");

  return NextResponse.json({
    connected: !error,
    error: error?.message,
    data,
  });
}