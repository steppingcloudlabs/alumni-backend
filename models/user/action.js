const mongoose = require('mongoose');

const getDataFromMaster = function(collectionName, query, callback) {
  mongoose.connect('mongodb://18.190.14.5:1000/titan', {
    useNewUrlParser: true,
  });
  const connection = mongoose.connection;
  connection.on('open', function() {
    mongoose.connection.db.collection(collectionName, function(
        err,
        collection
    ) {
      collection.find(query).toArray(callback);
    });
  });
  connection.on('error', console.error.bind(console, 'connection error:'));
};

const getDataFromPersonalStatus = function(collectionName, query, callback) {
  mongoose.connect('mongodb://18.190.14.5:1000/titan', {
    useNewUrlParser: true,
  });
  const connection = mongoose.connection;
  connection.on('open', function() {
    mongoose.connection.db.collection(collectionName, function(
        err,
        collection
    ) {
      collection
          .find(query)
          .project({
            _id: 0,
            userId: 1,
            fnfStatus: 1,
            pfTransferStatus: 1,
            form16: 1,
            uanDetails: 1,
            salarycurrent: 1,
            salaryprevious: 1,
            salarylast: 1,
          })
          .toArray(callback);
    });
  });
  connection.on('error', console.error.bind(console, 'connection error:'));
};

module.exports = {
  getDataFromMaster,
  getDataFromPersonalStatus,
};
