const mongoose = require('mongoose');
const config = require('config');
const winston = require('winston');
require('dotenv').config();

module.exports = function() {
    require('dotenv').config();
    const db = process.env.MONGO_URL;
    mongoose.connect(db)
        .then(() => winston.info('Connected to MongoDB...'))
}