import mongoose from "mongoose";

const userPolicySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  policyId: { type: mongoose.Schema.Types.ObjectId, ref: "Policy", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  benefits: [{ type: String, required: true }],
  premium: { type: Number, required: true },
  coverageAmount: { type: Number, required: true },
  duration: { type: Number, required: true }, // in months
  purchaseDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  status: { type: String, enum: ["active", "expired"], default: "active" }
});

// Auto-update status based on expiryDate before saving
userPolicySchema.pre("save", function (next) {
  this.status = this.expiryDate < new Date() ? "expired" : "active";
  next();
});

const UserPolicy = mongoose.model("UserPolicy", userPolicySchema);
export default UserPolicy;
