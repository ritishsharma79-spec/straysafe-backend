import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";
import { connectDB } from "./config/db.js";
import animalRoutes from "./routes/animals.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();  //creating a server obj similar to app=flask(__name__)
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:5173", // this is my react port allowing react 
  credentials: true,
}));
app.use(express.json());//convert the JSON from frontend to Java script object cuse express cant read JSON

app.use(session({
  secret:            process.env.SESSION_SECRET,
  resave:            false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,   // JS can't read this cookie — prevents XSS attacks
    maxAge:   7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
  },
}));
 
app.use(passport.initialize());//This starts Passport passport.auth works cause of this
app.use(passport.session());//Use the session cookie to find the logged-in user.



// ab rotes ke url method ke hisab se send kar dena
app.use("/api/animals", animalRoutes);
app.use("/auth",        authRoutes);

// Health check 
app.get("/", (req, res) => res.json({ message: "StraySafe API is running 🐾" }));


//connect DB is a async which returns a oromise ,then when its succes
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});//app.listen is main server toh yaha se hei shuru hoga