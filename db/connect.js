const mongoose = require('mongoose');

exports.connectToDB = () => {
    const MONGODB_URI = process.env.DB_URI;
    mongoose.connect(MONGODB_URI);

    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to', MONGODB_URI);
    });
    mongoose.connection.on('error', (err) => {
        console.log('Mongoose connection error:', err);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });
};