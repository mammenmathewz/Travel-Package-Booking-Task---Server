"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth_controllers");
const authRouter = express_1.default.Router();
authRouter.post("/signup", auth_controllers_1.signup);
authRouter.post("/login", auth_controllers_1.login);
authRouter.post("/google-login", auth_controllers_1.googleLogin);
exports.default = authRouter;
