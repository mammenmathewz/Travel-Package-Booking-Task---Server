"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBookings = exports.getAllUsers = void 0;
const UserSchema_1 = require("../models/UserSchema"); // Adjust path if different
const mongoose_1 = __importDefault(require("mongoose"));
const BookingSchema_1 = require("../models/BookingSchema"); // 
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserSchema_1.User.find().select("-password");
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getAllUsers = getAllUsers;
const getUserBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const bookings = yield BookingSchema_1.Booking.find({ user: userId })
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
});
exports.getUserBookings = getUserBookings;
