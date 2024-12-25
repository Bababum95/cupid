import { NextResponse } from "next/server";

import { checkToken } from "@/utils";
import { logger } from "@/lib/logger";
import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");
  const tokenStatus = checkToken(authHeader);

  if (!tokenStatus) {
    return NextResponse.json(
      { message: { title: "Unauthorized" } },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    const url = new URL(request.url);
    const pageId = url.searchParams.get("pageId");
    const verified = !(url.searchParams.get("verified") === "false");
    const ratings = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, total: 0 };

    if (!pageId) {
      return NextResponse.json(
        { message: "Page ID is required" },
        { status: 400 }
      );
    }

    const ratingDistribution = await Comment.aggregate([
      { $match: { pageId, verified } },
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
    ]);

    for (const { _id, count } of ratingDistribution) {
      if (_id >= 1 && _id <= 5) {
        ratings[_id as keyof typeof ratings] = count;
        ratings.total += count;
      }
    }

    return NextResponse.json({ ratings }, { status: 200 });
  } catch (error) {
    logger.error("Error fetching ratings", error);
    return NextResponse.json({}, { status: 500 });
  }
}
