import express from 'express'
import { addPackage, deletePackage, getAllPackages, updatePackage } from '../controllers/admin_pkg_management'

const adminRouter = express.Router()

adminRouter.post('/addpackage', addPackage)
adminRouter.put('/updatepackage/:id', updatePackage) 
adminRouter.delete('/deletepackage/:id', deletePackage )
adminRouter.get('/getpackages', getAllPackages)

export default adminRouter