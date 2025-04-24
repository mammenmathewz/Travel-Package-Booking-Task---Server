import { Schema, model, Types } from "mongoose";

const packageSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  basePrice: { type: Number, required: true },
  packageDetails: { type: String, required: true },
  includedServices: {
    food: { type: Boolean, default: false },
    accommodation: { type: Boolean, default: false }
  },
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

export const TravelPackage = model("TravelPackage", packageSchema);
