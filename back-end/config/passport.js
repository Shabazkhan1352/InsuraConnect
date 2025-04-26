import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import User from '../models/User.js'

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://insuraconnect.onrender.com/auth/google/callback", // Updated,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the email exists in the database
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // If user exists but doesn't have a Google ID, link it
          if (!user.googleId) {
            user.googleId = profile.id;
            user.profilePicture = profile.photos[0].value; // Update profile picture
            await user.save();
          }
        } else {
          // If the user doesn't exist, create a new one
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            profilePicture: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "https://insuraconnect.onrender.com/auth/github/callback", // Updated
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the email exists
        let email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
        let user = await User.findOne({ email });

        if (user) {
          // If user exists but doesn't have a GitHub ID, link it
          if (!user.githubId) {
            user.githubId = profile.id;
            user.profilePicture = profile.photos?.[0]?.value;
            await user.save();
          }
        } else {
          // If the user doesn't exist, create a new one
          user = new User({
            name: profile.displayName || profile.username,
            email,
            githubId: profile.id,
            profilePicture: profile.photos?.[0]?.value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
