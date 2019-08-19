
const express = require('express');
const logic = require('./logic');
const logger = require('./logger');
const bodyParser = require('body-parser');

const server = express();
server.use(express.static('.'));
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());
server.use('', logger);
server.listen(8080);

console.log('Server started!');

