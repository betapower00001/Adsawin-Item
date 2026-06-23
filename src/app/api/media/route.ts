import { get } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");

  if (!pathname || !pathname.startsWith("cms/")) {
    return NextResponse.json(
      { error: "Invalid pathname" },
      { status: 400 },
    );
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    console.error("BLOB_READ_WRITE_TOKEN is missing");

    return NextResponse.json(
      { error: "Blob token is not configured" },
      { status: 500 },
    );
  }

  try {
    const result = await get(pathname, {
      access: "private",
      token,
      ifNoneMatch:
        request.headers.get("if-none-match") ?? undefined,
    });

    if (!result) {
      return new NextResponse("Not found", {
        status: 404,
      });
    }

    if (result.statusCode === 304) {
      return new NextResponse(null, {
        status: 304,
        headers: {
          ETag: result.blob.etag,
          "Cache-Control": "private, no-cache",
        },
      });
    }

    return new NextResponse(result.stream, {
      status: 200,
      headers: {
        "Content-Type":
          result.blob.contentType || "application/octet-stream",
        "X-Content-Type-Options": "nosniff",
        ETag: result.blob.etag,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (error) {
    console.error("Private Blob fetch failed:", error);

    const message =
      error instanceof Error ? error.message : "Unknown Blob error";

    if (
      message.includes("403") ||
      message.toLowerCase().includes("access denied")
    ) {
      return NextResponse.json(
        {
          error:
            "Blob token was rejected or does not belong to this Blob Store",
        },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { error: "Unable to fetch Blob" },
      { status: 500 },
    );
  }
}