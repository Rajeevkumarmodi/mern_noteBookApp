import express from "express";
import connectDB from "./database/db.js";
import auth from "./routes/auth.js";
import "dotenv/config";

connectDB();
const app = express();

app.use(express.json());

app.use("/api/auth", auth);

// app.use("/api/note", note);

app.listen(process.env.PORT, () => console.log("server is ready to run"));
