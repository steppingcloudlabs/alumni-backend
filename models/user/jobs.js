const mongoose = require('mongoose');
const {Schema} = mongoose;

const jobschema = new Schema({});

jobschema.index({'$**': 'text'});
const Jobs = mongoose.model('Jobs', jobschema, 'jobs');

module.exports = Jobs;
