const winston = require('winston');
const express = require('express');
const app = express();
// const { Customer } = require('./models/customer');

// const Redis = require('redis');
// const client = Redis.createClient();
// (async () => {
//     await client.connect();
// })()

require('./startup/db')();
require('./startup/routes')(app);
require('./startup/validation')();
require('./startup/logging')();


// app.get('/api', caches('api'), async(req, res) => {
//     const customers = await Customer.find()
//     await client.setEx('api', 3600, JSON.stringify(customers))
//     res.send(customers)
// })
// function caches(key) {
//      async(req, res, next) => {
//         const value = await client.get(key);
//         if (value !== null) return res.send(JSON.parse(value));
//         else next();
//     }
// }


const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listening on port ${port}`))
