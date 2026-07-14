#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local
const envPath = resolve(".env.local");
const envContent = readFileSync(envPath, "utf-8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const [key, value] = line.split("=");
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const url = envVars.NEXT_PUBLIC_SUPABASE_URL;
const key = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("\n🔍 Admin Dashboard Reservations Debug\n");
console.log("📍 URL:", url);
console.log("🔑 Key exists:", !!key);

const supabase = createClient(url, key);

console.log("\n📋 Query: SELECT * FROM reservations (with no filters)\n");

try {
  const { data, error } = await supabase
    .from("reservations")
    .select("*");

  console.log("✅ Query executed");
  console.log("📊 Data returned:", {
    rowCount: data?.length || 0,
    data: data,
  });
  console.log("❌ Error returned:", error);

  if (error) {
    console.error("\n🚨 Query Error Details:");
    console.error("  Message:", error.message);
    console.error("  Code:", error.code);
    console.error("  Details:", error.details);
  } else {
    console.log("\n✨ Query succeeded");
    if (!data || data.length === 0) {
      console.warn("⚠️  RESULT: Table appears EMPTY (0 rows returned)");
      console.warn("   This could mean:");
      console.warn("   1. Table is truly empty");
      console.warn("   2. RLS policy is silently filtering all rows");
      console.warn("   3. Data doesn't match RLS policy criteria");
    } else {
      console.log(`✅ RESULT: ${data.length} rows found`);
      console.log("\n📄 Sample rows:");
      data.slice(0, 2).forEach((row, i) => {
        console.log(`\n  Row ${i + 1}:`, JSON.stringify(row, null, 2));
      });
    }
  }
} catch (err) {
  console.error("💥 Unexpected error:", err.message);
}

console.log("\n\n📋 Checking table columns...\n");

try {
  // Try to get table structure
  const { data: columns, error: colError } = await supabase
    .from("reservations")
    .select()
    .limit(0);

  console.log("📊 Column info:", {
    hasData: !!columns,
    error: colError?.message || "None",
  });
} catch (err) {
  console.log("⚠️  Could not retrieve column info (expected with RLS)");
}
