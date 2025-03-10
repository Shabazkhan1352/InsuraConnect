import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/claims", claimRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
