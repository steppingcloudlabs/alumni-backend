const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// using ref :"user" Schema; both admin and user are present in "user" Schema
const managerSchema = new Schema({
  esclation_manager_1: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },

  esclation_manager_2: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  esclation_manager_3: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const manager = mongoose.model('managers', managerSchema);
module.exports = manager;
