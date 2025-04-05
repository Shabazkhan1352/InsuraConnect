import express from "express";
import { getUserPolicies, addUserPolicy,removeUserPolicy,updatePolicyOnRenewal } from "../controllers/userPoliciesController.js";

const router = express.Router();

// Route to fetch user's policies
router.get("/:userId", getUserPolicies);

// Route to add a new purchased policy
router.post("/", addUserPolicy);
//delete policy
router.delete("/", removeUserPolicy);
router.put('/:id',updatePolicyOnRenewal)


export default router;
