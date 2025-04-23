import express from "express";
import authRouter from "./auth_router";
import adminRouter from "./admin_router";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/admin",adminRouter)

export default router;