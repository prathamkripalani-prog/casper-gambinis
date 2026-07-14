#!/usr/bin/env node

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local manually
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

console.log("\n🔍 Supabase Connection Test\n");
console.log("📍 URL:", url);
console.log("🔑 Key exists:", !!key);

if (!url || !key) {
  console.error("❌ Missing environment variables");
  process.exit(1);
}

const supabase = createClient(url, key);

console.log("\n📋 Testing Query 1: SELECT * FROM reservations\n");

try {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .limit(10);

  if (error) {
    console.error("❌ SELECT Query Error:");
    console.error("  Message:", error.message);
    console.error("  Code:", error.code);
    console.error("  Details:", error.details);

    if (error.code === "PGRST116" || error.message.includes("permission")) {
      console.error("\n🔐 RLS SELECT Policy Missing!");
    }
  } else {
    console.log("✅ SELECT Query succeeded!");
    console.log("📊 Row count:", data?.length || 0);

    if (data && data.length > 0) {
      console.log("\n📋 Column Names:");
      Object.keys(data[0]).forEach((col) => console.log(`   - ${col}`));
      console.log("\n📄 Sample Row:");
      console.log(JSON.stringify(data[0], null, 2));
    } else {
      console.log("⚠️  Table returned 0 rows");
    }
  }
} catch (err) {
  console.error("💥 SELECT Query unexpected error:", err.message);
}

console.log("\n📋 Testing Query 2: INSERT test record\n");

try {
  const testRecord = {
    booking_code: "TEST-" + Date.now(),
    name: "Test User",
    email: "test@example.com",
    phone: "555-0100",
    reservation_date: new Date().toISOString().split("T")[0],
    reservation_time: "19:00",
    guests: 2,
    special_requests: "Test record from debugging",
    status: "Pending",
  };

  console.log("Inserting test record:", testRecord);

  const { data, error: insertError } = await supabase
    .from("reservations")
    .insert([testRecord])
    .select();

  if (insertError) {
    console.error("❌ INSERT Query Error:");
    console.error("  Message:", insertError.message);
    console.error("  Code:", insertError.code);
    console.error("  Details:", insertError.details);

    if (insertError.code === "PGRST116" || insertError.message.includes("permission")) {
      console.error("\n🔐 RLS INSERT Policy Missing!");
      console.error(
        "Your 'reservations' table has RLS enabled but INSERT is blocked for 'anon' role."
      );
    }
  } else {
    console.log("✅ INSERT succeeded!");
    console.log("📊 Inserted record:", data);

    // Now try to select to verify visibility
    console.log("\n📋 Query 3: SELECT after INSERT\n");
    const { data: selectData, error: selectError } = await supabase
      .from("reservations")
      .select("*");

    if (selectError) {
      console.error("❌ SELECT after INSERT failed:", selectError.message);
    } else {
      console.log("✅ SELECT after INSERT returned:", selectData?.length || 0, "rows");
    }
  }
} catch (err) {
  console.error("💥 INSERT Query unexpected error:", err.message);
}
