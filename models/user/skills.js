const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-url');

const skillsschema = new Schema({
  skills: {type: [String],
    required: true},
});

const skills = mongoose.model(
    'skills',
    skillsschema,
    'skills'
);
module.exports = skills;
