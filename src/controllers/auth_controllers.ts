import { Request,Response } from "express";
import { isValidEmailAndPassword } from "../services/authValidation";
import { User } from "../models/UserSchema";
import { HashService } from "../services/hashService";
import { generateToken } from "../services/jwt";
import { adminAuth } from "../services/firebase";


const hashService = new HashService();

export const signup = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;
  
  if (!isValidEmailAndPassword(email, password)) {
    return res.status(400).json({ message: "Invalid email or password format" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await hashService.hashPassword(password);
  const newUser = await User.create({ name, email, password: hashedPassword });

  const token = generateToken({ id: newUser._id, email: newUser.email });

  return res.status(201).json({
    message: "User created successfully",
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
};

export const login = async (req: Request, res: Response):Promise<Response> => {
    try {
        const { email, password } = req.body;

      
        const user = await User.findOne({ email });
        if (!user || !user.password) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await hashService.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = generateToken({ id: user._id, email: user.email});

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const googleLogin = async (req:Request, res:Response) => {
    const { token: idToken } = req.body; 
  
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      const { email, name, picture } = decoded;
  
      let user = await User.findOne({ email });
  
      if (!user) {
        user = await User.create({
          name,
          email,
          profilePic: picture,
          isGoogleUser: true,
          role: "user",
        });
      }
  
      const token = generateToken({
        id: user._id,
        role: user.role,
      });
  
      return res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
          profilePic: user.profilePic,
        },
      });
    } catch (err) {
      console.error("Google login failed:", err);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
  