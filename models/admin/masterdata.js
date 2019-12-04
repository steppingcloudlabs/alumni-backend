const mongoose = require('mongoose');
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const {each, queue} = require('async');
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
  gender: {
    type: String,
  },
  date_of_birth: {
    type: String,
  },
  skill: [
    {
      type: String,
    },
  ],
});

// finding mongoose fuzzy search based fields in masterdata
masterschema.plugin(mongoose_fuzzy_searching, {
  fields: [
    'first_name_personal_information',
    'personal_email_id',
    'user_id',
    'middle_name_personal_information',
  ],
});
// removing anagrams from existing fields from masterschema in order for partial search
const masterdata = mongoose.model('masterdata', masterschema);
const updateFuzzy = async (Model, attrs) => {
  const docs = await Model.find();

  const updateToDatabase = async (data, callback) => {
    try {
      if (attrs && attrs.length) {
        const obj = attrs.reduce(
            (acc, attr) => ({...acc, [attr]: data[attr]}),
            {}
        );
        return Model.findByIdAndUpdate(data._id, obj).exec();
      }
      return Model.findByIdAndUpdate(data._id, data).exec();
    } catch (e) {
      console.log(e);
    } finally {
      callback();
    }
  };
  const myQueue = queue(updateToDatabase, 10);
  each(docs, (data) => myQueue.push(data.toObject()));
  myQueue.empty = function() {};
  myQueue.drain = function() {};
};
// usage
updateFuzzy(masterdata, ['first_name_personal_information']);
updateFuzzy(masterdata, ['personal_email_id']);
updateFuzzy(masterdata, ['user_id']);
updateFuzzy(masterdata, ['middle_name_personal_information']);
module.exports = masterdata;
