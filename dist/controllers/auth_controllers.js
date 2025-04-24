"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.login = exports.signup = void 0;
const authValidation_1 = require("../services/authValidation");
const UserSchema_1 = require("../models/UserSchema");
const hashService_1 = require("../services/hashService");
const jwt_1 = require("../services/jwt");
const firebase_1 = require("../services/firebase");
const hashService = new hashService_1.HashService();
const signup = async (req, res) => {
    const { name, email, password } = req.body;
    if (!(0, authValidation_1.isValidEmailAndPassword)(email, password)) {
        return res.status(400).json({ message: "Invalid email or password format" });
    }
    const userExists = await UserSchema_1.User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await hashService.hashPassword(password);
    const newUser = await UserSchema_1.User.create({ name, email, password: hashedPassword });
    const token = (0, jwt_1.generateToken)({ id: newUser._id, email: newUser.email });
    return res.status(201).json({
        message: "User created successfully",
        token,
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
    });
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserSchema_1.User.findOne({ email });
        if (!user || !user.password) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await hashService.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = (0, jwt_1.generateToken)({ id: user._id, email: user.email });
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.login = login;
const googleLogin = async (req, res) => {
    const { token: idToken } = req.body;
    try {
        const decoded = await firebase_1.adminAuth.verifyIdToken(idToken);
        const { email, name, picture } = decoded;
        let user = await UserSchema_1.User.findOne({ email });
        if (!user) {
            user = await UserSchema_1.User.create({
                name,
                email,
                profilePic: picture,
                isGoogleUser: true,
                role: "user",
            });
        }
        const token = (0, jwt_1.generateToken)({
            id: user._id,
            role: user.role,
        });
        return res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role,
                profilePic: user.profilePic,
            },
        });
    }
    catch (err) {
        console.error("Google login failed:", err);
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.googleLogin = googleLogin;
