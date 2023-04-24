const { User } = require('../models/user');
const validate = require('../middlewares/validate');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', validate(validateUser), async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
});

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })

    return schema.validate(user)
}

module.exports = router;