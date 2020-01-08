const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  senders: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },

  message: {
    type: String,
    required: true
  },
  created_at: {
    type: String,
    required: true,
    unique: true
  }
});

const User = mongoose.model("messages", messageSchema);
module.exports = User;
