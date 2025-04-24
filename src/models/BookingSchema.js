"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Types.ObjectId, ref: "User", required: true },
    travelPackage: { type: mongoose_1.Types.ObjectId, ref: "TravelPackage", required: true },
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
exports.Booking = (0, mongoose_1.model)("Booking", bookingSchema);
