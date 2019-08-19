function REST(type) {
    let req = new XMLHttpRequest();

    let body = {
        a:'test',
        b:'test2'
    };

    req.open(type, 'http://localhost:8080/api', true);
    req.setRequestHeader("Content-type", "application/json");

    req.onreadystatechange = function (ev) {
        if (req.readyState == 4) {
           let result = ev.currentTarget.response;
            console.log(result);

            const textResult = document.getElementById('text');
            textResult.innerHTML = result + "\n";
            textResult.style.border = '2px black';

            var candleInString = result;

            var candles = candleInString.split("\n");

            console.log(candles);

            for(let candle of candles){
                console.log(JSON.parse(candle));
            }

        } else {
            console.log(req.readyState);
        }
    };

    req.send(JSON.stringify(body));
}

document.getElementById('getCandle')
    .addEventListener('click', () => {
        REST('GET');
    });
