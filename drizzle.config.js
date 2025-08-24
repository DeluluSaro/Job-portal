import { defineConfig } from 'drizzle-kit';
import 'dotenv/config'; // Loads .env.local

export default defineConfig({
  schema: './lib/schema.js',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://zi_owner:jcOlq5T7xZHW@ep-winter-bread-a55zw05s-pooler.us-east-2.aws.neon.tech/job_seeker?sslmode=require&channel_binding=requirenpm install drizzle-kit@latest -D',
  },
  verbose: true,
  strict: true,
});