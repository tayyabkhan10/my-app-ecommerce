// 📁 drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv"; // ✅ Import dotenv

// ✅ Manually .env load karein (pehle .env.local, phir .env)
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/schema.ts", // ✅ Aapka schema path
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // ✅ Ab yeh load ho jayega
  },
});