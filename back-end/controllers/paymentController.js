import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import  Policy  from "../models/Policy.js";  // Import Payment Model

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    try {
      const { userId, policyId, amount } = req.body;
  
      const options = {
        amount: amount * 100, // Convert INR to paisa (₹500 -> 50000)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1, // Auto capture payment
      };
  
      const order = await razorpay.orders.create(options);
  
      // Save payment details in DB
      const payment = new Payment({
        user: userId,
        policy: policyId,
        amount,
        status: "pending", // Default pending until payment is verified
      });
  
      await payment.save();
  
      res.json({ success: true, order });
    } catch (error) {
      console.error("Error in createOrder:", error);
      res.status(500).json({ success: false, message: "Failed to create payment order" });
    }
  };


 // Ensure correct model import

 // Ensure you have this import
 
 export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, policyId } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Update payment status in DB
      await Payment.findOneAndUpdate(
        { user: userId, policy: policyId },
        { status: "success" }
      );

      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};
