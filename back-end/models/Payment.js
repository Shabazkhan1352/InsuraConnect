import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    policy: { type: mongoose.Schema.Types.ObjectId, ref: "Policy", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["success", "failed", "pending"], default: "pending" },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
