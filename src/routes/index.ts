import express from "express";
import authRouter from "./auth_router";
import adminRouter from "./admin_router";
import bookingRouter from "./booking_router";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/admin", adminRouter)
router.use('/booking',verifyToken, bookingRouter)

export default router;