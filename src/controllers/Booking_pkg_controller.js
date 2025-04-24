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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = void 0;
const BookingSchema_1 = require("../models/BookingSchema");
const PackageSchema_1 = require("../models/PackageSchema");
const UserSchema_1 = require("../models/UserSchema");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, travelPackageId, customizedServices, totalPrice } = req.body;
        if (!userId || !travelPackageId || totalPrice === undefined) {
            return res.status(400).json({ message: "User ID, Travel Package ID, and total price are required." });
        }
        const user = yield UserSchema_1.User.findById(userId);
        const travelPackage = yield PackageSchema_1.TravelPackage.findById(travelPackageId);
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
        const savedBooking = yield newBooking.save();
        return res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error." });
    }
});
exports.createBooking = createBooking;
