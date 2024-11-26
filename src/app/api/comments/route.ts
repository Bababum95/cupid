import { NextResponse } from "next/server";
import validator from "validator";

import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { logger } from "@/lib/logger";
import { checkToken } from "@/utils";

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!checkToken(authHeader)) {
    return NextResponse.json(
      { message: { title: "Unauthorized" } },
      { status: 401 }
    );
  }

  try {
    const data = await request.json();

    const { name, email, message, rating, pageId } = data;

    if (!pageId) {
      return NextResponse.json(
        { message: { title: "Request is not valid" } },
        { status: 400 }
      );
    }

    if (!email || !validator.isEmail(email)) {
      return NextResponse.json(
        {
          message: {
            title: "notices.invalid-email.title",
            description: "notices.invalid-email.description",
          },
        },
        { status: 400 }
      );
    }

    if (!name || !message || !rating) {
      return NextResponse.json(
        { message: { title: "Name, message, and rating are required." } },
        { status: 400 }
      );
    }

    await dbConnect();

    const comment = await Comment.create({
      name,
      email,
      message,
      rating,
      pageId,
    });

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    logger.error("Error creating comment", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
    const limit = parseInt(url.searchParams.get("limit") || "4", 10);
    const offset = parseInt(url.searchParams.get("offset") || "0", 10);
    const verified = !(url.searchParams.get("verified") === "false");

    let skipFields = "-__v -updatedAt -pageId";

    if (tokenStatus !== "admin") {
      skipFields += " -email";
    }

    if (!pageId) {
      return NextResponse.json(
        { message: "Page ID is required" },
        { status: 400 }
      );
    }

    const comments = await Comment.find({ pageId, verified })
      .select(skipFields)
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    const totalComments = await Comment.countDocuments({ pageId, verified });

    return NextResponse.json(
      { comments, total: totalComments },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error retrieving comments", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
