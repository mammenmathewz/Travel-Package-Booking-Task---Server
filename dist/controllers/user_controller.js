"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = void 0;
const UserSchema_1 = require("../models/UserSchema");
const getProfile = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await UserSchema_1.User.findById(userId).select("name address phone profilePic");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            name: user.name,
            address: user.address,
            phone: user.phone,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    const userId = req.params.userId;
    const { name, address, phone, profilePic } = req.body;
    try {
        const user = await UserSchema_1.User.findByIdAndUpdate(userId, { name, address, phone, profilePic }, { new: true }).select("name address phone profilePic");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            name: user.name,
            address: user.address,
            phone: user.phone,
            profilePic: user.profilePic,
        });
    }
    catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateProfile = updateProfile;
