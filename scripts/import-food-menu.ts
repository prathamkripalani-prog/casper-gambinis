import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
import { createClient } from "@supabase/supabase-js";
import { foodMenu } from "../src/data/foodMenu";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  console.log("🚀 Starting food menu import...");

  // Clear existing data
  await supabase.from("menu_items").delete().neq("id", 0);
  await supabase.from("menu_categories").delete().neq("id", 0);

  const categoryMap = new Map<string, number>();

  // Import categories
  for (let i = 0; i < foodMenu.length; i++) {
    const category = foodMenu[i];

    const { error } = await supabase
      .from("menu_categories")
      .insert({
        name: category.title,
        menu_type: "food",
        sort_order: i,
      });

    if (error) {
      console.error(`❌ Failed to create category ${category.title}`, error);
      continue;
    }

    console.log(`✅ Category imported: ${category.title}`);
  }

    console.log(`🎉 Categories imported successfully`);

  const { data: categories, error: categoryError } = await supabase
    .from("menu_categories")
    .select("id, name");

  if (categoryError) {
    console.error("❌ Failed to fetch categories", categoryError);
    return;
  }

  categories?.forEach((cat) => {
    categoryMap.set(cat.name, cat.id);
  });

  console.log(`📋 Loaded ${categoryMap.size} category IDs`);

  // Import menu items
  for (const category of foodMenu) {
    const categoryId = categoryMap.get(category.title);

    if (!categoryId) continue;

    for (let index = 0; index < category.items.length; index++) {
      const item = category.items[index];

      // Skip nested groups if they ever exist
      if ("items" in item) continue;

      const { error } = await supabase
        .from("menu_items")
        .insert({
          category_id: categoryId,
          name: item.name,
          description: item.description ?? null,
          price: item.price ?? null,
          add_ons: item.addOns ?? null,
          sizes: item.sizes ?? null,
          options: item.options ?? null,
          available: true,
          sort_order: index,
        });

      if (error) {
        console.error(`❌ Failed to import ${item.name}`, error);
      } else {
        console.log(`✅ ${item.name}`);
      }
    }
  }

  console.log("🎉🎉 Food menu imported successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
