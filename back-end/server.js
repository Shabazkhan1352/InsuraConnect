import express from "express";
import cors from 'cors'
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import claimRoutes from "./routes/claimRoutes.js";

import userPoliciesRoutes from "./routes/userPolicies.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

//applying cors in app to allow all ports to accress the routes
app.use(cors());

app.use("/api/auth", userRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/user_policies", userPoliciesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
