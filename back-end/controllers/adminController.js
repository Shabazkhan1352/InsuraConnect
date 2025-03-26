import User from "../models/User.js"
import Policy from "../models/Policy.js"
import Claim from "../models/Claim.js"

import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

//for login and register admin
export const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

        const newAdmin = new Admin({ name, email, password });
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin Login
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(401).json({ message: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ id: admin._id, role: 'admin',name : admin.name }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Admin login successful', token , role : "admin",name : admin.name  });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


//for getting statistics of users
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPolicies = await Policy.countDocuments();
    const totalRenewals = await Policy.countDocuments({ status: "Renewed" });
    const pendingClaims = await Claim.countDocuments({ status: "Pending" });

    res.status(200).json({ totalUsers, totalPolicies, totalRenewals, pendingClaims });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



export const gettopPolicies = async (req, res) => {
    try {
        const policies = await Policy.aggregate([
            {
                $lookup: {
                    from: "userpolicies", // Join with the userpolicies collection
                    localField: "_id",
                    foreignField: "policyId",
                    as: "purchasedPolicies"
                }
            },
            {
                $addFields: {
                    purchases: { $size: "$purchasedPolicies" }, // Count number of purchases
                    totalRevenue: {
                        $multiply: [{ $size: "$purchasedPolicies" }, "$premium"] // Calculate revenue
                    }
                }
            },
            { $sort: { purchases: -1 } }, // Sort by most purchased
            { $limit: 5 }, // Get top 5 policies
            {
                $project: {
                    title: 1,
                    description: 1,
                    benefits: 1,
                    premium: 1,
                    coverageAmount: 1,
                    duration: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    purchases: 1,
                    totalRevenue: 1
                }
            }
        ]);

        // Convert revenue into USD format
        const formattedPolicies = policies.map(policy => ({
            ...policy,
            totalRevenue: new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(policy.totalRevenue)
        }));

        res.json(formattedPolicies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching policies", error });
    }
};









// Admin Signup (For Initial Setup)
