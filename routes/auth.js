import express from "express";
import passport from "passport";

const router = express.Router();

// Google se baat through passport schema

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google sends user back here after they sign in 
// now create session
// On success → redirect to React app
// On failure → redirect to login page
router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  (req, res) => {
    // Auth succeeded — session is created — send user back to React app
    res.redirect(process.env.FRONTEND_URL);
  }
);

// ── Logout ───
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({ success: true });
  });
});

// ── Check who's currently logged in ──
// React's AuthContext calls this on app start to restore the session
// If session exists → return user. If not → return null.
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ success: true, user: req.user });
  } else {
    res.json({ success: false, user: null });
  }
});

export default router;


// In app.jsx we import passport
// from './config/passport'

// Similarly, config/models/auth.js
// Now when we import passport it runs.

// Now in auth.js it runs

// passport.authenticate("google")

// It remembers that we have schema
// google and runs google strategy
// from passport.js

// Then Google sends response
// /google/callback

// then serializer runs