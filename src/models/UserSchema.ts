import { Schema, model } from "mongoose";


const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  profilePic: { type: String },
  address: { type: String },
  phone: { type: String }, 
  isGoogleUser: { type: Boolean, default: false },
  role: { type: String, enum: ["admin", "user"], default: "user" },
}, { timestamps: true });

export const User = model("User", userSchema);
