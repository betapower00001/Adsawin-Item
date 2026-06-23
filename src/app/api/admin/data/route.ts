import { NextResponse } from "next/server";
import { hasAdminSessionFromRequest } from "@/lib/adminAuth";
import { getCmsData, saveCmsData } from "@/lib/cms";
import type { CmsData } from "@/types/cms";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "กรุณาเข้าสู่ระบบหลังบ้าน" }, { status: 401 });
}

export async function GET(request: Request) {
  if (!hasAdminSessionFromRequest(request)) return unauthorized();

  try {
    const data = await getCmsData({ strict: true });
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "อ่านข้อมูลไม่สำเร็จ" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  if (!hasAdminSessionFromRequest(request)) return unauthorized();

  try {
    const body = (await request.json()) as Partial<CmsData>;

    if (!Array.isArray(body.homeCharacters) || !Array.isArray(body.categories)) {
      return NextResponse.json({ error: "รูปแบบข้อมูลไม่ถูกต้อง" }, { status: 400 });
    }

    const saved = await saveCmsData(body);
    return NextResponse.json(saved, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "บันทึกข้อมูลไม่สำเร็จ" },
      { status: 500 },
    );
  }
}
