"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBookings = exports.getAllUsers = void 0;
const UserSchema_1 = require("../models/UserSchema"); // Adjust path if different
const mongoose_1 = __importDefault(require("mongoose"));
const BookingSchema_1 = require("../models/BookingSchema"); // 
const getAllUsers = async (req, res) => {
    try {
        const users = await UserSchema_1.User.find().select("-password");
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getAllUsers = getAllUsers;
const getUserBookings = async (req, res) => {
    const { userId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const bookings = await BookingSchema_1.Booking.find({ user: userId })
            .populate({
            path: "travelPackage",
            select: "startDate endDate basePrice from to ",
        });
        const response = bookings.map((booking) => {
            const pkg = booking.travelPackage;
            return {
                bookingId: booking._id,
                travelPackage: {
                    id: pkg._id,
                    name: pkg.name,
                    startDate: pkg.startDate,
                    endDate: pkg.endDate,
                    basePrice: pkg.basePrice,
                    from: pkg.from,
                    to: pkg.to,
                },
                customizedServices: booking.customizedServices,
                totalPrice: booking.totalPrice,
                createdAt: booking.createdAt,
            };
        });
        res.status(200).json(response);
    }
    catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUserBookings = getUserBookings;
