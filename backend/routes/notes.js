import fetchUser from "../middleware/authentication.js";
import Note from "../models/note.js";
import express from "express";
const router = express.Router();

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    // fetch notes
    const notes = await Note.find({ user: req.userId });
    console.log("notes", notes);
    if (!notes) {
      res.status(200).send("Notes Not Found");
    } else {
      res.status(200).send(notes);
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

router.post("/addnote", fetchUser, async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      return res.status(200).json({ error: "All fields are requied 😠❌" });
    } else {
      console.log(req.userId);
      const note = await new Note({ title, description, user: req.userId });
      const saveNote = await note.save();

      res.send({ success: "Note successfully created👍", saveNote });
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

export default router;
