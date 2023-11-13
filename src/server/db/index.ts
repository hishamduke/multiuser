import { config } from "dotenv";
import { createClient } from "@libsql/client";

config();

const url = process.env.DBURL ?? "";
const authToken = process.env.DBTOKEN ?? "";

export const db = createClient({
  url,
  authToken,
});
