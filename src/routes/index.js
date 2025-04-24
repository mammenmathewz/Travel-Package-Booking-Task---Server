"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./auth_router"));
const admin_router_1 = __importDefault(require("./admin_router"));
const booking_router_1 = __importDefault(require("./booking_router"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const user_router_1 = __importDefault(require("./user_router"));
const router = express_1.default.Router();
router.use("/auth", auth_router_1.default);
router.use("/admin", admin_router_1.default);
router.use('/booking', authMiddleware_1.verifyToken, booking_router_1.default);
router.use("/user", authMiddleware_1.verifyToken, user_router_1.default);
exports.default = router;
