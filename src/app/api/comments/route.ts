import { NextResponse } from "next/server";
// import validator from "validator";

export async function POST(request: Request) {
  return NextResponse.json({ request }, { status: 200 });
}
