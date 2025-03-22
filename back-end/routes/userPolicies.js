import express from "express";
import { getUserPolicies, addUserPolicy } from "../controllers/userPoliciesController.js";

const router = express.Router();

// Route to fetch user's policies
router.get("/:userId", getUserPolicies);

// Route to add a new purchased policy
router.post("/", addUserPolicy);

export default router;
