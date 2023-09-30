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

// find single note

router.get("/updatenote/:id", fetchUser, async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ _id: id });
    if (!note) {
      return res.send({ error: "Note not found" });
    }
    if (note.user.toString() !== req.userId) {
      return res.send({ error: "Not allowed" });
    }

    res.send(note);
  } catch (error) {
    console.log(error);
  }
});

// update note
router.patch("/updatenote/:id", fetchUser, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const note = await Note.findOne({ _id: id });
    if (!note) {
      return res.status(400).json({ error: "Note not found " });
    }

    if (note.user.toString() !== req.userId) {
      return res.status(401).send({ error: "Not Allowed" });
    }

    const updated = await Note.updateOne(
      { _id: id },
      { $set: { title, description } }
    );
    res.json("Note update successfully 👍");
  } catch (error) {
    console.log(error);
  }
});

// delete note

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findOne({ _id: id });
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    if (note.user.toString() !== req.userId) {
      return res.status(401).json({ error: "Not Allowed" });
    }

    const deleteNote = await Note.deleteOne({ _id: id });

    res.json({ Success: "Note has been deleted", note: deleteNote });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});
export default router;
