import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "adsawin_admin_session";

function configuredPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

function sessionValue(password: string) {
  return createHash("sha256")
    .update(`adsawin-admin-session:${password}`)
    .digest("hex");
}

export function isAdminConfigured() {
  return configuredPassword().length >= 8;
}

export function verifyAdminPassword(candidate: string) {
  const expectedPassword = configuredPassword();
  if (expectedPassword.length < 8) return false;

  const expected = Buffer.from(sessionValue(expectedPassword));
  const actual = Buffer.from(sessionValue(candidate));
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function getAdminSessionValue() {
  const password = configuredPassword();
  return password.length >= 8 ? sessionValue(password) : "";
}

export async function hasAdminSession() {
  const expected = getAdminSessionValue();
  if (!expected) return false;

  const cookieStore = await cookies();
  const actual = cookieStore.get(ADMIN_COOKIE_NAME)?.value ?? "";
  if (!actual || actual.length !== expected.length) return false;

  return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}

export function hasAdminSessionFromRequest(request: Request) {
  const expected = getAdminSessionValue();
  if (!expected) return false;

  const cookieHeader = request.headers.get("cookie") ?? "";
  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE_NAME}=`));

  const actual = cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : "";
  if (!actual || actual.length !== expected.length) return false;

  return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}
