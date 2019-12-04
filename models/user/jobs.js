const mongoose = require('mongoose');
const {Schema} = mongoose;

const Jobs = mongoose.model('Jobs', new Schema({}), 'jobs');
module.exports = Jobs;
