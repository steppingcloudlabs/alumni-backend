const mongoose = require('mongoose');

const getDataFromMaster = function(collectionName, query, callback) {
    
    mongoose.connect("mongodb://localhost/mydb", { useNewUrlParser: true });
    const connection = mongoose.connection;
    connection.on('open', function () {
        mongoose.connection.db.collection(collectionName, function (err, collection) {
            collection.find(query).toArray(callback)
        });
    });
    connection.on('error', console.error.bind(console, 'connection error:'));


}

module.exports={
    getDataFromMaster
};