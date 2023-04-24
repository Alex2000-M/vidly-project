const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const Joi = require('joi');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 200
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 200
    }
})

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const Schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(200).required(),
        dailyRentalRate: Joi.number().min(0).max(200).required()
    })
    return Schema.validate(movie)
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;