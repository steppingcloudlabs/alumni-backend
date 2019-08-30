const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
require("mongoose-type-url");

const companySchema = new Schema({
  companyname: {
    type: String,
    required: true
  },
  companyid: {
    type: String,
    required: true
  },
  companyurl: {
    type: mongoose.SchemaTypes.Url,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  tokenurl: {
    type: mongoose.SchemaTypes.Url,
    required: true
  }
});

const CompanyActions = mongoose.model("company", companySchema);
module.exports = CompanyActions;
