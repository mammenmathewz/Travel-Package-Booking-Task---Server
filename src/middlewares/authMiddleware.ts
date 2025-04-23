// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: any;
//     }
//   }
// }


// const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// export const authenticateToken = ( req: Request,res: Response,next: NextFunction) => {
//     const authHeader = req.headers["authorization"];
  
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "Authorization token missing or invalid" });
//     }
  
//     const token = authHeader.split(" ")[1];
  
//     try {
//       const decoded = jwt.verify(token, JWT_SECRET);
//       req.user = decoded;
//       next();
//     } catch (err) {
//       console.error("JWT verification error:", err);
//       return res.status(403).json({ message: "Invalid or expired token" });
//     }
//   };