import express from 'express'
import { addPackage, deletePackage, getAllPackages, updatePackage } from '../controllers/admin_pkg_management'
import { getAllUsers, getUserBookings } from '../controllers/admin_user_controllers'

const adminRouter = express.Router()

adminRouter.post('/addpackage', addPackage)
adminRouter.put('/updatepackage/:id', updatePackage) 
adminRouter.delete('/deletepackage/:id', deletePackage )
adminRouter.get('/getpackages', getAllPackages)

adminRouter.get("/getallusers",getAllUsers)
adminRouter.get("/getuserbookings/:userId", getUserBookings)

export default adminRouter