const { User, validateUser } = require('../models/user');
const auth = require('../middlewares/auth')
const validate = require('../middlewares/validate');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

router.post('/', validate(validateUser), async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User is already registered.');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken()
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
})

module.exports = router;