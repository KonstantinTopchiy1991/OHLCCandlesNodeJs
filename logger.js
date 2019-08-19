const fs = require("fs");
const express = require('express');
let connection = require('./mysqlDB');
const router = express.Router();

router.get('/api', function (req, res) {

    // let fileContent = fs.readFileSync("candle.txt", "utf8");
    // res.send({fileContent});

    connection.query('SELECT * FROM candles', function (error, results, fields) {
        res.send({results});
    });

});

module.exports = router;