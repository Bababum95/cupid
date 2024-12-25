import { NextResponse } from "next/server";
import validator from "validator";

import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { logger } from "@/lib/logger";
import { checkToken } from "@/utils";

export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (checkToken(authHeader) !== "admin") {
    return NextResponse.json(
      { message: { title: "Forbidden" } },
      { status: 403 }
    );
  }

  try {
    const data = await request.json();

    const {
      name,
      email,
      message,
      rating,
      pageId,
      verified = true,
      photos = [],
      createdAt = new Date(),
    } = data;

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

    if (!name || !message || !rating || !email) {
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
      verified,
      photos,
      createdAt,
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

export async function DELETE(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (checkToken(authHeader) !== "admin") {
    return NextResponse.json(
      { message: { title: "Forbidden" } },
      { status: 403 }
    );
  }

  try {
    const url = new URL(request.url);
    const commentId = url.searchParams.get("id");

    if (!commentId) {
      return NextResponse.json(
        { message: { title: "Comment ID is required" } },
        { status: 400 }
      );
    }

    await dbConnect();

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return NextResponse.json(
        { message: { title: "Comment not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: { title: "Comment deleted successfully" } },
      { status: 200 }
    );
  } catch (error) {
    logger.error("Error deleting comment", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
