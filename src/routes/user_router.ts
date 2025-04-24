import express from 'express';
import { getProfile, updateProfile } from '../controllers/user_controller';

const userRouter = express.Router();

userRouter.get('/profile/:userId', getProfile);
userRouter.put('/update/:userId', updateProfile ); 


export default userRouter;