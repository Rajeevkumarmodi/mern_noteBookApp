import mongoose, { Schema, model } from "mongoose";

const noteSchema = new Schema({
  title: {
    type: String,
    requirde: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date,
    now,
  },
});

const Note = model("Note", noteSchema);

export default Note;
