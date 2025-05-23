import UserPolicy from "../models/userPolicy.js" // Import UserPolicy Model
import Policy from "../models/Policy.js" // Import Policy Model
import mongoose from "mongoose";

// Fetch active & expired policies for a user with policy details
export const getUserPolicies = async (req, res) => {
  try {
    const { userId } = req.params;
    const today = new Date();

    // Fetch user policies
    const userPolicies = await UserPolicy.find({ userId });

    if (!userPolicies || userPolicies.length === 0) {
      return res.status(404).json({ message: "No policies found for this user" });
    }

    // Format and separate active & expired policies
    const activePolicies = [];
    const expiredPolicies = [];
    const allPolicies = []; 

    userPolicies.forEach((policy) => {
      const formattedPolicy = {
        userPolicyId: policy._id, // ✅ This is the unique MongoDB ID
        userId: policy.userId,
        policyId: policy.policyId,
        title: policy.title,
        description: policy.description,
        benefits: policy.benefits,
        premium: policy.premium,
        coverageAmount: policy.coverageAmount,
        duration: policy.duration,
        purchaseDate: policy.purchaseDate,
        expiryDate: policy.expiryDate,
        status: policy.status,
      };

      allPolicies.push(formattedPolicy);

      if (policy.expiryDate >= today) {
        activePolicies.push(formattedPolicy);
      } else {
        expiredPolicies.push(formattedPolicy);
      }
    });

    res.status(200).json({ allPolicies, activePolicies, expiredPolicies });
  } catch (error) {
    console.error("Error fetching policies:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a new policy purchase (Fixed 3-Month Duration)
export const addUserPolicy = async (req, res) => {
  try {
    const { userId, policyId } = req.body;

    if (!userId || !policyId) {
      return res.status(400).json({ message: "User ID and Policy ID are required." });
    }

    // Fetch policy details
    const policy = await Policy.findById(policyId);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found." });
    }

    const purchaseDate = new Date(); // Purchase date is today
    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + 3); // Fixed 3-month expiry

    const status = expiryDate >= new Date() ? "active" : "expired";

    // Save policy details
    const newUserPolicy = new UserPolicy({
      userId,
      policyId: policy._id,
      title: policy.title,
      description: policy.description,
      benefits: policy.benefits,
      premium: policy.premium,
      coverageAmount: policy.coverageAmount,
      duration: 3, // Fixed 3-month duration
      purchaseDate,
      expiryDate,
      status,
    });

    await newUserPolicy.save();
    res.status(201).json({ message: "Policy purchased successfully", newUserPolicy });
  } catch (error) {
    console.error("Error adding policy:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//remove policy
export const removeUserPolicy = async (req, res) => {
  try {
    const { userId, policyId } = req.body;

    if (!userId || !policyId) {
      return res.status(400).json({ message: "User ID and Policy ID are required." });
    }

    // Find and delete the policy
    const deletedPolicy = await UserPolicy.findOneAndDelete({ userId, policyId });

    if (!deletedPolicy) {
      return res.status(404).json({ message: "Policy not found for this user." });
    }

    res.status(200).json({ message: "Policy removed successfully." });
  } catch (error) {
    console.error("Error removing policy:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update policy status and expiry date (on successful renewal)
export const updatePolicyOnRenewal = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid UserPolicy ID" });
    }

    const renewDate = new Date();
    const expiryDate = new Date(renewDate);
    expiryDate.setMonth(expiryDate.getMonth() + 3); // Renew for 3 months

    const status = "active";

    const updatedPolicy = await UserPolicy.findByIdAndUpdate(
      id,
      {
        status,
        expiryDate,
        purchaseDate: renewDate,
      },
      { new: true }
    );

    if (!updatedPolicy) {
      return res.status(404).json({ message: "Policy not found" });
    }

    res.json({
      success: true,
      message: "Policy renewed successfully",
      policy: updatedPolicy,
    });
  } catch (error) {
    console.error("Renewal Error:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
