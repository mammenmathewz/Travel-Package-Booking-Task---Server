import express,{Router} from "express";
import { signup,login, googleLogin } from "../controllers/auth_controllers"

const authRouter:Router = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/google-login",googleLogin)

export default authRouter;
