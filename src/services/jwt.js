"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(payload) {
    var _a;
    return jsonwebtoken_1.default.sign(payload, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "secret", { expiresIn: '10d' });
}
