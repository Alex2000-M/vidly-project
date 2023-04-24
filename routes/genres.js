const {Genre, validateGenre } = require('../models/genre');
const validate = require('../middlewares/validate');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find()
    res.send(genres)
});

router.post('/', validate(validateGenre), async (req, res) => {
    const genre = new Genre({
        name: req.body.name
    })
    await genre.save();

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name
        }
    }, { new: true });
    
    if (!genre) return res.status(404).send('The genre with given id was not found.')

    res.send(genre)
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send('The genre with given id was not found.')

    res.send(genre)
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with given id was not found.')
    res.send(genre);
});

module.exports = router