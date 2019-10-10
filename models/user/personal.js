const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-url");

const personalschema = new Schema({
    userId:{
        type:String
    },
    form16:{
        type:String
    },
    salarycurrent:{
        type:String
    },
    salaryprevious:{
        type:String
    },
    salarylast:{
        type:String
    },
    fnfStatus:{
        type:String
    },
    pfTransferStatus:{
        type:String
    },
    form16Status:{
        type:String
    },
    uanDetails:{
        type:String
    },


});

const personalinformation = mongoose.model("personalinformation",personalschema );
module.exports = personalinformation;