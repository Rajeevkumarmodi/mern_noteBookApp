import express from "express";
const router = express.Router();
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import fetchUser from "../middleware/authentication.js";

// signup router

router.post("/signup", async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  try {
    // Validation

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // email validation
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Please enter a valid email" });
    }

    // get single user
    const user = await User.findOne({ email });

    // check user already present or not

    if (user) {
      res.status(400).json({ error: "User already exists" });
    } else {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User({ name, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ success: "Signup Successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log(error);
  }
});

// login router

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Please enter valid email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (doMatch) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      res.status(201).json({ token, success: "Login successfully" });
    } else {
      res.status(400).json({ error: "Please enter currect password" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Internal server error" });
  }
});

// get user router

router.get("/getuser", fetchUser, async (req, res) => {
  try {
    console.log(req.userId);
    const userId = req.userId;
    console.log("getuser Id", userId);
    const user = await User.findById(userId).select("-password");
    res.send(user);
    console.log("getuser", user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});
export default router;
