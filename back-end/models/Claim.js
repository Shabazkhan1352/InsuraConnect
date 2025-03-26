// import mongoose from "mongoose";

// const claimSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     policy: { type: mongoose.Schema.Types.ObjectId, ref: "Policy", required: true },
//     status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
//     claimAmount: { type: Number, required: true },
//     reason: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const Claim = mongoose.model("Claim", claimSchema);
// export default Claim;

import mongoose from 'mongoose';

const ClaimSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    policyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
    policyName: { type: String, required: true }, // Added field
    status: { type: String, default: 'Pending' } // Added status field
}
,
{ timestamps: true }
);

export default mongoose.model('Claim', ClaimSchema);

