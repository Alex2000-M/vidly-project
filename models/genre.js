const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
})

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    const Schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });

    return Schema.validate(genre)
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;