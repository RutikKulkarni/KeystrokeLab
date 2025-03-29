import mongoose from "mongoose";
import { ISession } from "../types/session";

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  wpm: {
    type: Number,
    required: true,
    min: 0,
  },
  accuracy: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  totalErrors: {
    type: Number,
    required: true,
    min: 0,
  },
  errorWords: [
    {
      type: String,
      trim: true,
    },
  ],
  typingDurations: [
    {
      type: Number,
      min: 0,
    },
  ],
  duration: {
    type: Number,
    required: true,
    enum: [15, 30],
  },
  text: {
    type: String,
    required: true,
  },
  psychologicalInsights: {
    impulsivity: { type: Number, min: 0, max: 1 },
    cognitiveLoad: { type: Number, min: 0, max: 1 },
    resilience: { type: Number, min: 0, max: 1 },
    anxiety: { type: Number, min: 0, max: 1 },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

sessionSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<ISession>("Session", sessionSchema);
