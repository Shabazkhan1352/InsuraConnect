import nodemailer from 'nodemailer';
import Claim from '../models/Claim.js';
import Policy from '../models/Policy.js';
import mongoose from 'mongoose';

export const claimPolicy = async (req, res) => {
    try {
        const { userEmail, policyId } = req.body;

        // Fetch policy details (including policy name)
        const policy = await Policy.findById(policyId);
        if (!policy) {
            return res.status(404).json({ message: 'Policy not found' });
        }

        // Save claim with policy name
        const claim = new Claim({ 
            userEmail, 
            policyId, 
            policyName: policy.title // Assuming `name` is the policy name field in Policy model
        });
        await claim.save();

        // Send email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Insurance Claim Status',
            text: `Your claim request for policy '${policy.name}' (ID: ${policyId}) has been received. An inspector has been assigned to your location for verification. You will be updated soon.`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Claim request submitted and email sent successfully.' });

    } catch (error) {
        res.status(500).json({ message: 'Error processing claim request', error });
    }
};
// Get all claims
export const getClaims = async (req, res) => {
  try {
    const claims = await Claim.find();
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a Claim (Admin only)
export const deleteClaim = async (req, res) => {
    try {
        const claimId = req.params.id;
    
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(claimId)) {
          return res.status(400).json({ message: "Invalid policy ID format" });
        }
    
        const deletedClaim = await Claim.findByIdAndDelete(claimId);
    
        if (!deletedClaim) {
          return res.status(404).json({ message: "Claim not found" });
        }
    
        res.json({ message: "Claim deleted successfully", deletedClaim });
      } catch (error) {
        console.error("Delete Claim Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
      }
};

// Approve a Claim (Admin only)
export const approveClaim = async (req, res) => {
    try {
        const { claimId } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(claimId)) {
            return res.status(400).json({ message: "Invalid claim ID format" });
        }

        // Find claim and update status to 'Approved'
        const claim = await Claim.findById(claimId);
        if (!claim) {
            return res.status(404).json({ message: "Claim not found" });
        }

        // Update claim status to Approved
        claim.status = "Approved";
        await claim.save();

        // Send approval email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: claim.userEmail,
            subject: 'Claim Approved: Insurance Policy',
            text: `Dear User,\n\nYour insurance claim for policy '${claim.policyName}' (ID: ${claim.policyId}) has been approved. The claim amount will be processed soon.\n\nThank you for choosing us!\n\nBest Regards,\nInsuraConnect Team`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Claim approved and email sent successfully", claim });

    } catch (error) {
        console.error("Approve Claim Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};