const mongoose = require("mongoose");
const { Schema } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const NotesSchema = new Schema({
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "user",
 },
 title: {
  type: String,
  required: true,
 },
 description: {
  type: String,
  required: true,
 },
 tag: {
  type: String,
  default: "General",
 },
 timestamp: {
  type: Date,
  default: Date.now,
 },
});

NotesSchema.plugin(mongoosePaginate)

const Note = mongoose.model("notes", NotesSchema);
module.exports = Note;
