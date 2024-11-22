import { NextResponse } from "next/server";

import { cookieLogger } from "@/lib/logger";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0] ||
    request.headers.get("remoteAddress") ||
    "IP not available";

  const cookie = await request.json();

  cookieLogger.info(ip, cookie);

  return NextResponse.json(
    { message: "Cookie saved successful" },
    { status: 200 }
  );
}
