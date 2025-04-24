"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelPackage = void 0;
const mongoose_1 = require("mongoose");
const packageSchema = new mongoose_1.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    basePrice: { type: Number, required: true },
    packageDetails: { type: String, required: true },
    includedServices: {
        food: { type: Boolean, default: false },
        accommodation: { type: Boolean, default: false }
    },
    deleted: { type: Boolean, default: false },
}, { timestamps: true });
exports.TravelPackage = (0, mongoose_1.model)("TravelPackage", packageSchema);
