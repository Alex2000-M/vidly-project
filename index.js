const winston = require('winston');
const express = require('express');
const app = express();


require('./startup/db')();
require('./startup/routes')(app);
require('./startup/validation')();
require('./startup/logging')();



const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listening on port ${port}`))
