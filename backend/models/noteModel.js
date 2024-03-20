const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "без названия",
    required: true,
  },
  smile: {
    type: String,
  },
  imageUrl: String,
  blocks: Object,
  createNote: {
    type: Date,
    default: Date.now,
  },
  subnotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subnote",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Note", noteSchema);
