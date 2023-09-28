import mongoose, { Schema, model } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const noteSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    requirde: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Note = model("Note", noteSchema);

export default Note;
