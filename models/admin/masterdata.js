const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-url');

const masterschema = new Schema({
  relieving_date: {
    type: String,
  },
  user_id: {
    type: String,
    unique: true,
  },
  date_of_resignation: {
    type: String,
  },
  last_working_day_as_per_notice_period: {
    type: String,
  },
  personal_email_id: {
    type: String,
  },
  first_name_personal_information: {
    type: String,
  },
  last_name_personal_information: {
    type: String,
  },
  middle_name_personal_information: {
    type: String,
  },
  nationality_personal_information: {
    type: String,
  },
  salutation_personal_information: {
    type: String,
  },
  city_addresses: {
    type: String,
  },
  phone_number_phone_information: {
    type: String,
  },
  manager_job_information: {
    type: String,
  },
  designation_job_information: {
    type: String,
  },
  skill: [
    {
      type: String,
    },
  ],
});

// finding keywords based search on masterdata
masterschema.index({'$**': 'text'});

const masterdata = mongoose.model('masterdata', masterschema);
module.exports = masterdata;
