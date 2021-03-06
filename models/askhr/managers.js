const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// using ref :"user" Schema; both admin and user are present in "user" Schema
const managerSchema = new Schema({
  esclation_manager_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  level: {
    type: String,
    enum: ['esclation_manager_1', 'esclation_manager_2', 'esclation_manager_3'],
    default: 'esclation_manager_1',
  },
});

const manager = mongoose.model('managers', managerSchema);
module.exports = manager;
