const { Rental, validateRentalOrReturn } = require('../models/rental');
const validate = require('../middlewares/validate');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals)
});

router.post('/', validate(validateRentalOrReturn), async(req, res) => {
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie');

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    if (movie.numberInStock === 0) return res.status(400).send('movie not found in stock')

    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
    });
    await rental.save();
    
    await Movie.updateOne({ _id: req.body.movieId }, {
        $inc: { numberInStock: -1 }
    });

    res.send(rental)
});

module.exports = router;