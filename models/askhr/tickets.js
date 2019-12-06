const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  participants: {
    type: [Schema.Types.ObjectId],
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,

    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
  },
  updated_by: {
    type: Schema.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: [Schema.Types.ObjectId],
    required: true,
  },
  esclation: {
    type: Boolean,
    required: true,
  },
  esclation_manager_1: {
    type: [Schema.Types.ObjectId],
    required: true,
    response: Boolean,
  },
  esclation_manager_2: {
    type: [Schema.Types.ObjectId],
    required: true,
    response: Boolean,
  },
  esclation_manager_3: {
    type: [Schema.Types.ObjectId],
    required: true,
    response: Boolean,
  },
  resolved_status: {
    type: Boolean,
    required: true,
    response: Boolean,
  },
});


const Ticket = mongoose.model('tickets', ticketSchema);
module.exports = Ticket;
