import { neon } from "@neondatabase/serverless";

export function getSql() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("ไม่พบ DATABASE_URL กรุณาเชื่อม Neon และดึง Environment Variables ก่อน");
  }

  return neon(databaseUrl);
}
