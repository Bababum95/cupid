import { NextResponse } from "next/server";
import validator from "validator";

import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
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

    const comment = await Comment.create(data);

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    logger.error("Error creating comment", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
