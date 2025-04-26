import Policy from "../models/Policy.js";
import mongoose from "mongoose";

// Get all policies
export const getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add a new policy (Admin only)
export const addPolicy = async (req, res) => {
  try {
    const { title, description, premium, coverageAmount, benefits } = req.body;

    const policy = await Policy.create({ title, description, premium, coverageAmount, duration  : 3,benefits });

    res.status(201).json({ message: "Policy added successfully", policy });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a policy (Admin only)
export const deletePolicy = async (req, res) => {
    try {
        const policyId = req.params.id;
    
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(policyId)) {
          return res.status(400).json({ message: "Invalid policy ID format" });
        }
    
        const deletedPolicy = await Policy.findByIdAndDelete(policyId);
    
        if (!deletedPolicy) {
          return res.status(404).json({ message: "Policy not found" });
        }
    
        res.json({ message: "Policy deleted successfully", deletedPolicy });
      } catch (error) {
        console.error("Delete Policy Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
};
