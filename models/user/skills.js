const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
const {each, queue} = require('async');
require('mongoose-type-url');

const expertiseSchema = new Schema({
  expertise: [
    {type: String,
      required: true},
  ],
});

// finding mongoose fuzzy search based fields in expertises
expertiseSchema.plugin(mongoose_fuzzy_searching, {
  fields: [
    'expertise',
  ],
});

// removing anagrams from existing fields from skils in order for partial search

const expertises = mongoose.model('expertises', expertiseSchema);

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
updateFuzzy(expertises, ['expertise']);
module.exports = expertises;
