import { NextResponse } from "next/server";
import validator from "validator";

import { checkToken } from "@/utils";
import { logger } from "@/lib/logger";
import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";

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
    const commentsArray = Array.isArray(data) ? data : [data];

    const preparedComments = commentsArray.map((commentData, index) => {
      const {
        name,
        email,
        message,
        rating,
        pageId,
        verified = true,
        photos = [],
        createdAt = new Date(),
      } = commentData;

      if (!pageId || !email || !name || !message || !rating) {
        throw new Error(`Validation failed for comment at index ${index}`, {
          cause: commentData,
        });
      }

      if (!validator.isEmail(email)) {
        throw new Error(`Invalid email: ${email}. Comment at index ${index}`, {
          cause: commentData,
        });
      }

      return {
        name,
        email,
        message,
        rating,
        pageId,
        verified,
        photos,
        createdAt,
      };
    });

    await dbConnect();

    const createdComments = await Comment.insertMany(preparedComments);

    return NextResponse.json({ comments: createdComments }, { status: 201 });
  } catch (error) {
    logger.error("Error creating comments", error);
    return NextResponse.json(
      { message: "Error creating comments", error },
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
