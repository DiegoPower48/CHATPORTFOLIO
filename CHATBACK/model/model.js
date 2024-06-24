const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    comentario: { type: String },
  },
  { collection: "CHATS" }
);

module.exports = mongoose.model("Item", itemSchema);
