const { Movie } = require('../models/movie');
const { Rental, validateRentalOrReturn } = require('../models/rental');
const validate = require('../middlewares/validate');
const express = require('express');
const router = express.Router();

router.post('/', validate(validateRentalOrReturn), async (req, res) => {
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
    if (!rental) return res.status(404).send('rental was not found');

    if (rental.dateReturned) res.status(400).send('return is already processed');

    rental.return();
    await rental.save();

    await Movie.updateOne({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    });

    res.send(rental)
});

module.exports = router;
