const { Customer, validateCustomer } = require('../models/customer');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const validate = require('../middlewares/validate');
const express = require('express');
const router = express.Router();
const Redis = require('redis');
const client = Redis.createClient();
(async () => {
    await client.connect();
})()

router.get('/', async (req, res) => {
    const value = await client.get('customer');
    if (value !== null) {
        console.log('Cache Hit!');
        return res.send(JSON.parse(value))
    }
    else {
        const customers = await Customer.find().sort('name');
        await client.setEx('customer', 3600, JSON.stringify(customers))
        console.log('Cache Miss!')
        return res.send(customers)
    }
});

router.post('/', validate(validateCustomer), async(req, res) => {
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    await customer.save();
    res.send(customer);
});

router.put('/:id', auth, validate(validateCustomer), async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        }
    }, { new: true });
    if (!customer) return res.status(404).send('The customer with given id was not found');
    res.send(customer)
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('The customer with given id was not found');
    res.send(customer)
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with given id was not found');
    res.send(customer)
});

module.exports = router;