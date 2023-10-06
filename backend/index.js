import express from "express";
import connectDB from "./database/db.js";
import auth from "./routes/auth.js";
import note from "./routes/notes.js";
import "dotenv/config";
import cors from "cors";

connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", auth);
app.use("/api/note", note);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
