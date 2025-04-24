import { Request, Response } from "express";
import { Booking } from "../models/BookingSchema"; // Adjust the path as necessary
import { TravelPackage } from "../models/PackageSchema"; // Assuming this is the model for TravelPackage
import { User } from "../models/UserSchema"; // Assuming this is the model for User

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { userId, travelPackageId, customizedServices, totalPrice } = req.body;

    // Validate required fields
    if (!userId || !travelPackageId || totalPrice === undefined) {
      return res.status(400).json({ message: "User ID, Travel Package ID, and total price are required." });
    }

    // Find the user and travel package
    const user = await User.findById(userId);
    const travelPackage = await TravelPackage.findById(travelPackageId);

    if (!user || !travelPackage) {
      return res.status(404).json({ message: "User or Travel Package not found." });
    }

    // Create the booking
    const newBooking = new Booking({
      user: userId,
      travelPackage: travelPackageId,
      customizedServices: customizedServices || { food: false, accommodation: false },
      totalPrice: totalPrice,
      status: "Accepted"
    });

    
    const savedBooking = await newBooking.save();

    return res.status(201).json({ message: "Booking created successfully", booking: savedBooking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};
