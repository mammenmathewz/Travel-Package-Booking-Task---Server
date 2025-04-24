"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    profilePic: { type: String },
    address: { type: String },
    phone: { type: String },
    isGoogleUser: { type: Boolean, default: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
