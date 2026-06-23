import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { hasAdminSessionFromRequest } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SERVER_UPLOAD_BYTES = 4 * 1024 * 1024;

function safeSegment(value: string) {
  return (
    value
      .trim()
      .replace(/[^a-zA-Z0-9ก-๙._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "") || "file"
  );
}

export async function POST(request: Request) {
  if (!hasAdminSessionFromRequest(request)) {
    return NextResponse.json(
      { error: "กรุณาเข้าสู่ระบบหลังบ้าน" },
      { status: 401 },
    );
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    console.error("BLOB_READ_WRITE_TOKEN is missing");

    return NextResponse.json(
      { error: "ยังไม่ได้ตั้งค่า BLOB_READ_WRITE_TOKEN" },
      { status: 500 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "ไม่พบไฟล์ที่อัปโหลด" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SERVER_UPLOAD_BYTES) {
      return NextResponse.json(
        {
          error:
            "ไฟล์ใหญ่เกิน 4 MB สำหรับการอัปโหลดแบบนี้ กรุณาบีบอัดไฟล์หรือใช้ URL ของไฟล์แทน",
        },
        { status: 413 },
      );
    }

    const folder = safeSegment(
      new URL(request.url).searchParams.get("folder") ?? "general",
    );

    const filename = safeSegment(file.name);

    const access =
      process.env.BLOB_ACCESS === "public"
        ? "public"
        : "private";

    const blob = await put(
      `cms/${folder}/${Date.now()}-${filename}`,
      file,
      {
        access,
        token,
        addRandomSuffix: true,
        cacheControlMaxAge: 60 * 60 * 24 * 30,
      },
    );

    const assetUrl =
      access === "public"
        ? blob.url
        : `/api/media?pathname=${encodeURIComponent(
            blob.pathname,
          )}`;

    return NextResponse.json({
      assetUrl,
      pathname: blob.pathname,
      url: blob.url,
      contentType: blob.contentType,
    });
  } catch (error) {
    console.error("Blob upload failed:", error);

    const message =
      error instanceof Error
        ? error.message
        : "อัปโหลดไฟล์ไม่สำเร็จ";

    if (
      message.includes("403") ||
      message.toLowerCase().includes("access denied")
    ) {
      return NextResponse.json(
        {
          error:
            "Blob Token ถูกปฏิเสธ หรือ Token ไม่ตรงกับ Blob Store",
        },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}