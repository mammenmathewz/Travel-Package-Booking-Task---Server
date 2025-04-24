import { Request, Response } from "express";
import { User } from "../models/UserSchema"; // Adjust path if different
import mongoose from "mongoose";
import { Booking } from "../models/BookingSchema"; // 

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); 
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserBookings = async (req: Request, res: Response) => {
    const { userId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
  
    try {
      const bookings = await Booking.find({ user: userId })
        .populate({
          path: "travelPackage",
          select: "startDate endDate basePrice from to ", 
        });
  
      const response = bookings.map((booking) => {
        const pkg = booking.travelPackage as any;
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
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };