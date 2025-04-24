import { Request,Response } from "express";
import { TravelPackage } from "../models/PackageSchema";


export const addPackage= async(req:Request,res:Response):Promise<Response>=>{
    try {
        const{from,to,startDate,endDate,basePrice,packageDetails,includedServices} = req.body
        
        if(!from || !to || !startDate || !endDate || !basePrice){
            return res.status(400).json({message:"Please provide all required fields"})
        }

        const newPackage = new TravelPackage({
            from,
            to,
            startDate,
            endDate,
            basePrice,
            packageDetails,
            includedServices: {
              food: includedServices?.food || false,
              accommodation: includedServices?.accommodation || false,
            },
          });
      
        await newPackage.save()
        return res.status(201).json({message:"Package created successfully",package:newPackage});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to create travel package" });
    }
}


export const updatePackage = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { from, to, startDate, endDate, basePrice,packageDetails, includedServices } = req.body;
  
      const updated = await TravelPackage.findByIdAndUpdate(
        id,
        {
          from,
          to,
          startDate,
          endDate,
          basePrice,
          packageDetails,
          includedServices: {
            food: includedServices?.food || false,
            accommodation: includedServices?.accommodation || false,
          },
        },
        { new: true }
      );
  
      if (!updated) return res.status(404).json({ message: "Package not found" });
  
      return res.json({ message: "Package updated successfully", package: updated });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to update travel package" });
    }
  };
  

  export const deletePackage = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
  
      const updated = await TravelPackage.findByIdAndUpdate(
        id,
        { deleted: true },
        { new: true }
      );
  
      if (!updated) {
        return res.status(404).json({ message: "Package not found" });
      }
  
      return res.json({ message: "Package soft-deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to soft delete travel package" });
    }
  };
  
  
  export const getAllPackages = async (_req: Request, res: Response): Promise<Response> => {
    try {
      const packages = await TravelPackage.find({ deleted: false }).sort({ createdAt: -1 });
      return res.json({ packages });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to retrieve travel packages" });
    }
  };
  