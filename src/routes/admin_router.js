"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_pkg_management_1 = require("../controllers/admin_pkg_management");
const admin_user_controllers_1 = require("../controllers/admin_user_controllers");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const adminRouter = express_1.default.Router();
adminRouter.post('/addpackage', authMiddleware_1.verifyToken, admin_pkg_management_1.addPackage);
adminRouter.put('/updatepackage/:id', authMiddleware_1.verifyToken, admin_pkg_management_1.updatePackage);
adminRouter.delete('/deletepackage/:id', authMiddleware_1.verifyToken, admin_pkg_management_1.deletePackage);
adminRouter.get('/getpackages', admin_pkg_management_1.getAllPackages);
adminRouter.get("/getallusers", authMiddleware_1.verifyToken, admin_user_controllers_1.getAllUsers);
adminRouter.get("/getuserbookings/:userId", authMiddleware_1.verifyToken, admin_user_controllers_1.getUserBookings);
exports.default = adminRouter;
