var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:pushpinCreator');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.db = db;
