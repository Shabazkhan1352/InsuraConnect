import express from "express";
import { getAdminStats, gettopPolicies,registerAdmin, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();
router.post('/login', loginAdmin);
router.post('/signup', registerAdmin);


router.get("/stats", getAdminStats);
router.get("/toppolicies",gettopPolicies)

export default router;