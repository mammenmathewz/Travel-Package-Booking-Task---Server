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
exports.googleLogin = exports.login = exports.signup = void 0;
const authValidation_1 = require("../services/authValidation");
const UserSchema_1 = require("../models/UserSchema");
const hashService_1 = require("../services/hashService");
const jwt_1 = require("../services/jwt");
const firebase_1 = require("../services/firebase");
const hashService = new hashService_1.HashService();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!(0, authValidation_1.isValidEmailAndPassword)(email, password)) {
        return res.status(400).json({ message: "Invalid email or password format" });
    }
    const userExists = yield UserSchema_1.User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = yield hashService.hashPassword(password);
    const newUser = yield UserSchema_1.User.create({ name, email, password: hashedPassword });
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
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield UserSchema_1.User.findOne({ email });
        if (!user || !user.password) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = yield hashService.compare(password, user.password);
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
});
exports.login = login;
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token: idToken } = req.body;
    try {
        const decoded = yield firebase_1.adminAuth.verifyIdToken(idToken);
        const { email, name, picture } = decoded;
        let user = yield UserSchema_1.User.findOne({ email });
        if (!user) {
            user = yield UserSchema_1.User.create({
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
});
exports.googleLogin = googleLogin;
