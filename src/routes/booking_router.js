"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Booking_pkg_controller_1 = require("../controllers/Booking_pkg_controller");
const bookingRouter = express_1.default.Router();
bookingRouter.post('/create', Booking_pkg_controller_1.createBooking);
exports.default = bookingRouter;
