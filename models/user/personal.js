const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-type-url');

const personalschema = new Schema({
    userId: {
        type: String,
        unique: true,
    },
    fnfStatus: {
        type: String,
    },
    pfTransferStatus: {
        type: String,
    },
    form16: {
        type: String,
    },
    salarycurrent: {
        type: String,
    },
    salaryprevious: {
        type: String,
    },
    salarylast: {
        type: String,
    },
    uanDetails: {
        type: String,
    },
    recommendedjobs: [{
        type: Schema.Types.ObjectId,
        $ref: 'jobs',
    }],
});

const personalinformation = mongoose.model('personalinformation', personalschema);
module.exports = personalinformation;