import express from 'express'
import { addPackage, deletePackage, getAllPackages, updatePackage } from '../controllers/admin_pkg_management'
import { getAllUsers, getUserBookings } from '../controllers/admin_user_controllers'
import { verifyToken } from '../middlewares/authMiddleware'

const adminRouter = express.Router()

adminRouter.post('/addpackage',verifyToken, addPackage)
adminRouter.put('/updatepackage/:id',verifyToken, updatePackage) 
adminRouter.delete('/deletepackage/:id',verifyToken, deletePackage )
adminRouter.get('/getpackages', getAllPackages)

adminRouter.get("/getallusers",verifyToken,getAllUsers)
adminRouter.get("/getuserbookings/:userId",verifyToken, getUserBookings)

export default adminRouter