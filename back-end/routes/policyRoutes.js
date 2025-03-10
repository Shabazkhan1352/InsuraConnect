import express from "express";
import { getPolicies, addPolicy, deletePolicy } from "../controllers/policyController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPolicies);
router.post("/", protect, addPolicy); // Only authenticated users
router.delete("/:id", protect, deletePolicy); // Only authenticated users

export default router;
