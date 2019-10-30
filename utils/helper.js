const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var MongoClient = require('mongodb').MongoClient;
const createmongodb = function (dbName, mongoHost, mongoPort) {
    const db = mongoose.connect('mongodb://' + mongoHost + ':' + mongoPort + '/' + dbName, { useNewUrlParser: true }, function (err) {
        if (err) throw err;
        console.log("database created");
    })
};
createmongodb("duck", "localhost", "27017")