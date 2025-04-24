import express from 'express';
import { getProfile } from '../controllers/user_controller';

const userRouter = express.Router();

userRouter.get('/profile/:userId', getProfile);

export default userRouter;