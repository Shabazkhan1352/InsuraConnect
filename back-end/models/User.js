import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true },
  {
    googleId: { type: String, unique: true, sparse: true }, // Store Google ID
    githubId: { type: String, unique: true, sparse: true }  // Store GitHub ID

  }
 
);

const User = mongoose.model("User", userSchema);
export default User;
