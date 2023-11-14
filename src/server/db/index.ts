import { config } from "dotenv";
import { createClient } from "@libsql/client";

config();

const syncUrl = process.env.DBURL ?? "";
const authToken = process.env.DBTOKEN ?? "";
const url = "file:src/server/db/sqlite.db";

export const db = createClient({
  url,
  authToken,
  // syncUrl,
});
