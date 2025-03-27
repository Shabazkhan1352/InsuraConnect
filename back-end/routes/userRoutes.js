import express from "express";
import passport from "passport";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// //google authentication
// router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleAuth);

// // GitHub Authentication
// router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
// router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), githubAuth);

export default router;
