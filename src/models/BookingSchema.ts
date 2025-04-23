import { Schema, model, Types } from "mongoose";

const bookingSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  travelPackage: { type: Types.ObjectId, ref: "TravelPackage", required: true },
  status: {
    type: String,
    enum: ["Accepted", "Cancelled"],
    default: "Accepted"
  },
  customizedServices: {
    food: { type: Boolean, default: false },
    accommodation: { type: Boolean, default: false }
  },
  totalPrice: { type: Number, required: true }
}, { timestamps: true });

export const Booking = model("Booking", bookingSchema);
