// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import { Strategy as GitHubStrategy } from 'passport-github2';
// import User from '../models/User.js';
// import dotenv from 'dotenv';

// dotenv.config();

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback",
//   }, async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await User.findOne({ googleId: profile.id });
  
//       if (!user) {
//         user = new User({
//           username: profile.displayName,
//           googleId: profile.id, // Store Google ID
//           profilePicture: profile.photos[0].value,
//         });
//         await user.save();
//       }
  
//       done(null, user);
//     } catch (err) {
//       done(err, null);
//     }
//   }));
  
//   passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
//     callbackURL: "/auth/github/callback",
//   }, async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await User.findOne({ githubId: profile.id });
  
//       if (!user) {
//         user = new User({
//           username: profile.username,
//           githubId: profile.id, // Store GitHub ID
//           profilePicture: profile.photos[0]?.value || '',
//         });
//         await user.save();
//       }
  
//       done(null, user);
//     } catch (err) {
//       done(err, null);
//     }
//   }));
  

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err, null);
//   }
// });
