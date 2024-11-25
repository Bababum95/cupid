import { Schema, model, models } from "mongoose";

const RatingSchema = new Schema({
  pageId: { type: String, required: true, unique: true },
  ratings: {
    1: { type: Number, default: 0 },
    2: { type: Number, default: 0 },
    3: { type: Number, default: 0 },
    4: { type: Number, default: 0 },
    5: { type: Number, default: 0 },
  },
});

const Rating = models.Rating || model("Rating", RatingSchema);

export default Rating;
