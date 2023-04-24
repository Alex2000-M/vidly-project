const express = require('express');
require('express-async-errors');
const genres = require('../routes/genres');
const movies = require('../routes/movies');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const returns = require('../routes/returns');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middlewares/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/movies', movies);
    app.use('/api/customers', customers);
    app.use('/api/rentals', rentals);
    app.use('/api/returns', returns);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}