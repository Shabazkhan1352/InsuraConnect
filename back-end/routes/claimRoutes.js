import express from "express";
import { submitClaim, approveClaim } from "../controllers/claimController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/submit", protect, submitClaim);
router.put("/:id/approve", protect, approveClaim);

export default router;
