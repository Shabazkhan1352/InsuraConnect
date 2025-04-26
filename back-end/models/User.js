import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Password is optional for OAuth users
    phone: { type: String }, // Optional for OAuth users
    role: { type: String, enum: ["user", "admin"], default: "user" },
    googleId: { type: String, unique: true, sparse: true }, // Store Google ID
    githubId: { type: String, unique: true, sparse: true }, // Store GitHub ID
    profilePicture: { type: String }, // Store profile picture URL
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
