import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    premium: { type: Number, required: true },
    coverageAmount: { type: Number, required: true },
    duration: { type: Number, required: true }, // in months
    benefits : {type : Array , required : true },
  },
  { timestamps: true }
);

const Policy = mongoose.model("Policy", policySchema);
export default Policy;
