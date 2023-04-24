const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');

module.exports = function() {
    const db = process.env.MONGO_URL;
    mongoose.connect(db)
        .then(() => winston.info('Connected to MongoDB...'))
}