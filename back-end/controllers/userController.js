import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id, email: user.email, role:user.role , username :user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({ message: "User registered successfully",token,role:"User",name :user.name });
  } catch (error) {              
    res.status(500).json({ message: "Server error", error });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email , username :user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token,role:"User",name :user.name  });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// export const googleAuth = async (req, res) => {
//   if (!req.user) {
//       return res.redirect("https://insuraconnect.vercel.app/auth-failure");
//   }

//   const token = jwt.sign({ id: req.user._id, email: req.user.email , username :req.user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });


//   res.redirect(`https://insuraconnect.vercel.app/auth-success?token=${token}`);
// };

// export const githubAuth = async (req, res) => {
//   if (!req.user) {
//     return res.redirect("https://insuraconnect.vercel.app/auth-failure");
// }

// const token = jwt.sign({ id: req.user._id, email: req.user.email , username :req.user.name }, process.env.JWT_SECRET, { expiresIn: "7d" });


// res.redirect(`https://insuraconnect.vercel.app/auth-success?token=${token}`);
// };
