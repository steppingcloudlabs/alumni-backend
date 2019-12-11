const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSystem = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: '43800m',
    },
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
    unique: true,
  },
});

const User = mongoose.model('notification', notificationSystem);
module.exports = User;
