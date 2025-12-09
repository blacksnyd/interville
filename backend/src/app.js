const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const app = express();


app.use(cors());
app.use(morgan());
app.use(express.json());
app.use('/api', routes);

module.exports = app;
