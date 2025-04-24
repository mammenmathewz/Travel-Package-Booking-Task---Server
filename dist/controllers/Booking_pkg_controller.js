"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = void 0;
const BookingSchema_1 = require("../models/BookingSchema");
const PackageSchema_1 = require("../models/PackageSchema");
const UserSchema_1 = require("../models/UserSchema");
const createBooking = async (req, res) => {
    try {
        const { userId, travelPackageId, customizedServices, totalPrice } = req.body;
        if (!userId || !travelPackageId || totalPrice === undefined) {
            return res.status(400).json({ message: "User ID, Travel Package ID, and total price are required." });
        }
        const user = await UserSchema_1.User.findById(userId);
        const travelPackage = await PackageSchema_1.TravelPackage.findById(travelPackageId);
        if (!user || !travelPackage) {
            return res.status(404).json({ message: "User or Travel Package not found." });
        }
        const newBooking = new BookingSchema_1.Booking({
            user: userId,
            travelPackage: travelPackageId,
            customizedServices: customizedServices || { food: false, accommodation: false },
            totalPrice: totalPrice,
            status: "Accepted"
        });
        const savedBooking = await newBooking.save();
        return res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
};
exports.createBooking = createBooking;
