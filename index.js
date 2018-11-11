const express = require('express')
const app = express()

const port = 3000
app.listen(port, () => console.log('Server running on port ' + port))

app.post('/', (req, res) => {
	const { sucess } = req.body

	if (sucess)
		actLed(1, 1)
	else 
		actLed(3,1)
})


const Gpio = require('onoff').Gpio;

const led = {
    1: new Gpio(13, 'out'),//red
    2: new Gpio(19, 'out'),//blue
    3: new Gpio(26, 'out')//yellow
};
let idLed = 1;
let value = 0;

function actLed(color, value) {
    led[color].write(parseInt(value), function (err, value) {
        if (err) {
            console.log("LED ERROR -", err);
        }
    });
}

setInterval(function () {
    value = value === 0 ? 1 : 0;
    actLed(2, value);    
},10800);