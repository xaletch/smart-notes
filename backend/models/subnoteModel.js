const mongoose = require("mongoose");

const subnoteSchema = new mongoose.Schema({
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
});

module.exports.Subnote = mongoose.model("Subnote", subnoteSchema);
