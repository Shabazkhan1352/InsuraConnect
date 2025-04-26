// import express from "express";
// import { submitClaim, approveClaim } from "../controllers/claimController.js";
// import protect from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/submit", protect, submitClaim);
// router.put("/:id/approve", protect, approveClaim);

// export default router;
// routes/claimRoutes.js
import express from 'express';
import protect from "../middleware/authMiddleware.js";
import { claimPolicy ,getClaims,deleteClaim ,approveClaim} from '../controllers/claimController.js';

const router = express.Router();

router.get('/',getClaims)
router.post('/claim', claimPolicy);
router.delete("/:id", protect, deleteClaim); 
router.patch("/:claimId/approve", protect, approveClaim); 

export default router;
