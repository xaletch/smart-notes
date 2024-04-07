const mongoose = require("mongoose");

const noteCartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  smile: {
    type: String,
  },
  imageUrl: String,
  blocks: Object,
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

module.exports = mongoose.model("NoteCart", noteCartSchema);
