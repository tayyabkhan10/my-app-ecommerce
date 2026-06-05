// 📁 src/scripts/seed.ts
// Run: npx tsx src/scripts/seed.ts

import { db } from "@/lib/db";
import { usersTable, productsTable } from "@/lib/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

const ADMIN_EMAIL = "nailaanjum1530@gmail.com";
const ADMIN_PASSWORD = "Admin@123456"; // ⚠️ Change this after seeding!

async function seedAdmin() {
  console.log("👤 Admin user seed kar raha hun...");

  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

  const [existing] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, ADMIN_EMAIL))
    .limit(1);

  if (!existing) {
    await db.insert(usersTable).values({
      name: "Admin",
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      emailVerified: new Date(),
    });
    console.log("✅ Admin user create ho gaya!");
  } else {
    // Already exists — role aur password update karo
    await db
      .update(usersTable)
      .set({
        role: "admin",
        password: hashedPassword,
        emailVerified: new Date(),
      })
      .where(eq(usersTable.email, ADMIN_EMAIL));
    console.log("✅ Admin user update ho gaya!");
  }

  console.log("   📧 Email:", ADMIN_EMAIL);
  console.log("   🔑 Password:", ADMIN_PASSWORD);
}

async function seedProducts() {
  console.log("\n👟 Products seed kar raha hun...");

  const products = [
    {
      name: "Classic Leather Boots",
      description: "Premium handcrafted leather boots — durable aur stylish.",
      price: "12999",
      originalPrice: "15999",
      category: "boots",
      imageUrl: "/images/boots.png",
      sizes: ["39", "40", "41", "42", "43", "44"],
      colors: ["Black", "Brown"],
      inStock: true,
      stockCount: 50,
      featured: true,
      rating: "4.8",
      reviewCount: 124,
    },
    {
      name: "Premium Sneakers",
      description: "Comfortable casual sneakers for everyday wear.",
      price: "8999",
      originalPrice: "10999",
      category: "sneakers",
      imageUrl: "/images/boots.png",
      sizes: ["39", "40", "41", "42", "43"],
      colors: ["White", "Black", "Navy"],
      inStock: true,
      stockCount: 30,
      featured: true,
      rating: "4.6",
      reviewCount: 89,
    },
    {
      name: "Formal Loafers",
      description: "Smart formal loafers — office aur events ke liye perfect.",
      price: "9999",
      originalPrice: "11999",
      category: "loafers",
      imageUrl: "/images/boots.png",
      sizes: ["40", "41", "42", "43", "44"],
      colors: ["Black", "Dark Brown"],
      inStock: true,
      stockCount: 25,
      featured: false,
      rating: "4.5",
      reviewCount: 56,
    },
    {
      name: "Casual Sneakers",
      description: "Lightweight sneakers for casual outings.",
      price: "6999",
      category: "sneakers",
      imageUrl: "/images/boots.png",
      sizes: ["39", "40", "41", "42"],
      colors: ["Gray", "White"],
      inStock: true,
      stockCount: 40,
      featured: false,
      rating: "4.3",
      reviewCount: 34,
    },
  ];

  for (const product of products) {
    await db.insert(productsTable).values(product);
  }

  console.log(`✅ ${products.length} products add ho gaye!`);
}

async function main() {
  console.log("🌱 Database seed shuru...\n");

  await seedAdmin();
  await seedProducts();

  console.log("\n🎉 Seeding complete!");
  console.log("⚠️  IMPORTANT: Admin password change kar lo production mein!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});