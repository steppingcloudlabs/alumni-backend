const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  senders: {
    type: [Schema.Types.ObjectId],
    required: true,
    unique: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
    lowercase: true,
  },
  created_at: {
    type: Date,
    required: true,
    unique: true,
  },
});

const User = mongoose.model('messages', messageSchema);
module.exports = User;
