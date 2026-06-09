import passport from "passport";  //it do all work for us login logout session google facebook auth
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; //this give way what to do to auth from google whatshould passport do
import dotenv from "dotenv";

dotenv.config();

// serializeUser decides what to store in the session cookie
// HTTP has no memory
// The session just remembers: "this person is logged in, here's their info"
passport.serializeUser((user, done) => {
  done(null, user);
});

// deserializeUser runs on every request to rebuild the user from the session
// Since we stored the whole user object, we just pass it straight through
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:  "http://localhost:5000/auth/google/callback",
    },
    // This runs after Google confirms the user is real
    // profile contains their Google account info — name, email, photo
    (accessToken, refreshToken, profile, done) => {
      // google send many field but we need only these
      const user = {
        googleId: profile.id,
        name:     profile.displayName,
        email:    profile.emails[0].value,
        avatar:   profile.photos[0].value,
      };
      // Pass user to serializeUser which stores it in the session
      return done(null, user);
    }
  )
);

export default passport;