import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
  },
  introspect: {
    casing: "preserve", // preserve the snake case - to avoid issues with supabase type gen
  },
});