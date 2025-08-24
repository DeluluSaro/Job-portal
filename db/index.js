import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema.js";

const client = postgres(process.env.DATABASE_URL, { prepare: false, max: 1 });
export const db = drizzle(client, { schema });
export { schema };
