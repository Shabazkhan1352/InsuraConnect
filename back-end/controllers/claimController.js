import Claim from "../models/Claim.js";

// Submit a claim
export const submitClaim = async (req, res) => {
  try {
    const { policy, claimAmount, reason } = req.body;

    const claim = await Claim.create({
      user: req.user.id,
      policy,
      claimAmount,
      reason,
      status: "pending",
    });

    res.status(201).json({ message: "Claim submitted successfully", claim });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Admin approves a claim
export const approveClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: "Claim not found" });
    }

    claim.status = "approved";
    await claim.save();

    res.json({ message: "Claim approved", claim });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
