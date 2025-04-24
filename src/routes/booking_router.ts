import express from 'express';
import { createBooking } from '../controllers/Booking_pkg_controller';

const bookingRouter = express.Router();

bookingRouter.post('/create', createBooking);

export default bookingRouter;