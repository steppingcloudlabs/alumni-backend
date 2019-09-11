const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost/mydb", { useNewUrlParser: true });



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
// connection.on('error', console.error.bind(console, 'connection error:'));
// const Masterdata=connection.on('open', function () {
//         mongoose.connection.db.collection('masterdata', function (err, collection) {
//             console.log(collection.find({ user_id: 1556174 }).toArray((err, data) => {
//                 console.log(data);
//             }))
//         });
//     });
module.exports={
    getDataFromMaster
};