"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPackages = exports.deletePackage = exports.updatePackage = exports.addPackage = void 0;
const PackageSchema_1 = require("../models/PackageSchema");
const addPackage = async (req, res) => {
    try {
        const { from, to, startDate, endDate, basePrice, packageDetails, includedServices } = req.body;
        if (!from || !to || !startDate || !endDate || !basePrice) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const newPackage = new PackageSchema_1.TravelPackage({
            from,
            to,
            startDate,
            endDate,
            basePrice,
            packageDetails,
            includedServices: {
                food: includedServices?.food || false,
                accommodation: includedServices?.accommodation || false,
            },
        });
        await newPackage.save();
        return res.status(201).json({ message: "Package created successfully", package: newPackage });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to create travel package" });
    }
};
exports.addPackage = addPackage;
const updatePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const { from, to, startDate, endDate, basePrice, packageDetails, includedServices } = req.body;
        const updated = await PackageSchema_1.TravelPackage.findByIdAndUpdate(id, {
            from,
            to,
            startDate,
            endDate,
            basePrice,
            packageDetails,
            includedServices: {
                food: includedServices?.food || false,
                accommodation: includedServices?.accommodation || false,
            },
        }, { new: true });
        if (!updated)
            return res.status(404).json({ message: "Package not found" });
        return res.json({ message: "Package updated successfully", package: updated });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to update travel package" });
    }
};
exports.updatePackage = updatePackage;
const deletePackage = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await PackageSchema_1.TravelPackage.findByIdAndUpdate(id, { deleted: true }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Package not found" });
        }
        return res.json({ message: "Package soft-deleted successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to soft delete travel package" });
    }
};
exports.deletePackage = deletePackage;
const getAllPackages = async (_req, res) => {
    try {
        const packages = await PackageSchema_1.TravelPackage.find({ deleted: false }).sort({ createdAt: -1 });
        return res.json({ packages });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to retrieve travel packages" });
    }
};
exports.getAllPackages = getAllPackages;
