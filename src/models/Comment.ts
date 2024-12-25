import { Schema, model, models } from "mongoose";
import validator from "validator";

/**
 * Mongoose schema for a Comment.
 * Represents a comment entity with required fields for name, email, message,
 * and a verification status.
 */
const CommentSchema = new Schema(
  {
    /**
     * The ID of the page this comment is associated with.
     * Can represent a blog post, product page, or any other page.
     */
    pageId: {
      type: String,
      required: true,
      index: true, // Index for faster lookups
    },

    /**
     * The name of the person who made the comment.
     */
    name: { type: String, required: true },

    /**
     * The email of the person who made the comment.
     */
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email: string) => validator.isEmail(email),
        message: "Invalid email address.",
      },
    },

    /**
     * The message content of the comment.
     */
    message: { type: String, required: true },

    /**
     * Rating provided by the commenter.
     * Must be a number between 1 and 5.
     */
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      validate: {
        validator: Number.isInteger,
        message: "Rating must be an integer between 1 and 5.",
      },
    },

    /**
     * Indicates whether the comment has been verified.
     * Default: false
     */
    verified: { type: Boolean, default: false },

    /**
     * Photos associated with the comment.
     * Array of strings representing photo URLs.
     */
    photos: { type: [String], required: false },
  },
  { timestamps: true }
);

/**
 * Comment model.
 * If a model with the same name exists, reuse it; otherwise, create a new model.
 */
const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
