fs = require('fs');
let connection = require('./mysqlDB');
let objMainSecond = [];
let objMainMinute = [];
let testArray = [];


function randomSecondObject() {

    let time = Math.round(new Date().getTime()/1000);
    let number = (Math.random() * (1.799 - 1.100) + 1.100).toFixed(4);
    let objSecond = { time: null, value: null, };
    objSecond.time = time;
    objSecond.value = number;


    let sql = "INSERT INTO random_number (time, value) VALUES ?";
    let values = [
        [objSecond.time,
        objSecond.value]
    ];
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("New number" + result.affectedRows);
    });

    // fs.appendFile('text.txt', JSON.stringify(objSecond)+'\n', function(){
    //     console.log('Новое число!')
    // });
    objMainSecond.push(objSecond);


    if( time % 60 === 0){
        for(let i = 0; i < objMainSecond.length; i++){
            testArray.push(objMainSecond[i].value);
        }
        testArray.sort();

        let data = new Date();
        let hour = data.getHours();
        let minute = data.getMinutes();

        let candleOhlc = { open: null, close: null, low: null, high: null, time: null };
        candleOhlc.open = objMainSecond[0].value;
        candleOhlc.close = objMainSecond[objMainSecond.length - 1].value;
        candleOhlc.low = testArray[0];
        candleOhlc.high = testArray[testArray.length - 1];
        candleOhlc.time = `${hour}:${minute}`;
        objMainMinute.push(candleOhlc);
        objMainSecond = [];
        testArray = [];

        let sql = "INSERT INTO candles (open, high, low, close, time) VALUES ?";
        let values = [
            [candleOhlc.open,
            candleOhlc.high,
            candleOhlc.low,
            candleOhlc.close,
            candleOhlc.time]
        ];
        connection.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("New candle!" + result.affectedRows);
        });

        // fs.appendFile('candle.txt', JSON.stringify(candleOhlc)+'\n', function(){
        //     console.log('New candle!')
        // });
    }

    return typeof(objSecond);
}

function interval() {
    setInterval(randomSecondObject, 1000);
}

interval();

