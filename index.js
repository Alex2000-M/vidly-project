const winston = require('winston');
const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();
const { Genre } = require('./models/genre');

(async () => {
    await client.connect();
})();

app.get('/', async (req, res) => {
    const value = await client.get('gen');
    if (value !== null) {
        console.log('Cache Hit!')
        return res.send(JSON.parse(value))
    }
    else {
        const genres = await Genre.find();
        await client.setEx('gen', 3600, JSON.stringify(genres))
        console.log('Cache Miss!')
        return res.send(genres)
    }
})

require('./startup/db')();
require('./startup/routes')(app);
require('./startup/validation')();
require('./startup/logging')();





const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listening on port ${port}`))
