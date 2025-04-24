import { Request, Response } from "express";
import { User } from "../models/UserSchema";


export const getProfile = async (req: Request, res: Response) => {
  const userId = req.params.userId; 

  try {
    const user = await User.findById(userId).select("name address phone profilePic");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      name: user.name,
      address: user.address,
      phone: user.phone,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { name, address, phone, profilePic } = req.body;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { name, address, phone, profilePic },
        { new: true } 
      ).select("name address phone profilePic");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        name: user.name,
        address: user.address,
        phone: user.phone,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

