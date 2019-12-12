const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// using ref :"user" Schema; both admin and user are present in "user" Schema
const ticketSchema = new Schema({
  participants: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
  ],

  created_at: {
    type: Date,
    value: Date.now(),
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  title: {
    type: String,
    required: true,
    unique: true,
  },
  message: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'messages',
    },
  ],
  esclation: {
    type: String,
    enum: ['true', 'false'],
    default: 'false',
  },
  esclation_manager_1: {
    type: Schema.Types.ObjectId,
    required: true,
    response: Boolean,
    ref: 'user',
  },

  esclation_manager_2: {
    type: Schema.Types.ObjectId,
    required: true,
    response: Boolean,
    ref: 'user',
  },
  esclation_manager_3: {
    type: Schema.Types.ObjectId,
    required: true,
    response: Boolean,
    ref: 'user',
  },
  esclation_manager: {
    type: String,
    enum: ['esclation_manager_1', 'esclation_manager_2', 'esclation_manager_3'],
    default: 'esclation_manager_1',
  },
  resolved_status: {
    type: Boolean,
    required: true,
    response: Boolean,
  },
});

const Ticket = mongoose.model('tickets', ticketSchema);
module.exports = Ticket;
