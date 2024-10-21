const mongoose = require("mongoose");

const subNoteSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "без названия",
    required: true,
  },
  smile: {
    type: String,
  },
  imageUrl: String,
  blocks: [Object],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subnotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subnote",
    },
  ],
  isPublic: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Subnote", subNoteSchema);
