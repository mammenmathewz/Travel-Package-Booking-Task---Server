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
exports.updateProfile = exports.getProfile = void 0;
const UserSchema_1 = require("../models/UserSchema");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield UserSchema_1.User.findById(userId).select("name address phone profilePic");
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
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const { name, address, phone, profilePic } = req.body;
    try {
        const user = yield UserSchema_1.User.findByIdAndUpdate(userId, { name, address, phone, profilePic }, { new: true }).select("name address phone profilePic");
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
});
exports.updateProfile = updateProfile;
