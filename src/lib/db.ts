import { neon } from "@neondatabase/serverless";

export function getSql() {
  const databaseUrl =
    process.env.DATABASE_URL ||
    process.env.DATABASE_URL_UNPOOLED ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL_NON_POOLING;

  if (!databaseUrl) {
    throw new Error(
      "ไม่พบ DATABASE_URL หรือ DATABASE_URL_UNPOOLED กรุณาตั้งค่า Environment Variables ใน Vercel",
    );
  }

  return neon(databaseUrl);
}