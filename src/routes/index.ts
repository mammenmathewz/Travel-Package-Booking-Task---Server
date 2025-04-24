import express from "express";
import authRouter from "./auth_router";
import adminRouter from "./admin_router";
import bookingRouter from "./booking_router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/admin",adminRouter)
router.use('/booking',bookingRouter)

export default router;