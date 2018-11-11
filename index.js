const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet');
const cors = require('cors')

const app = express()

app.use(helmet());
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

const port = 8080
app.listen(port, () => console.log('Server running on port ' + port))

app.post('/', function(req, res) {
  const { success } = req.body

  console.log(success)

  if(success) {
    actLed(3, 1)
  } else {
    actLed(1, 1)
  }

  res.send();
});

app.use(function(req, res) {
    res.status(404).send({ error: 'Serviço não encontrado' });
});

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

//Botões
const sw1 = new Gpio(6, 'in', 'falling', {debounceTimeout: 200});
const sw2 = new Gpio(5, 'in', 'both');

sw1.watch(function (err, value) {
    if (err) {        
        console.log("Switch 1 ERROR", err);
    } else {
        state_sw1 = 0;
        led["red"].writeSync(state_sw1);        
        led["yellow"].writeSync(state_sw1);
    }
});

sw2.watch(function (err, value) {
    if (err) {        
        console.log("Switch 2 ERROR", err);
    } else {
        state_sw1 = 0;
        led["red"].writeSync(state_sw1);        
        led["yellow"].writeSync(state_sw1);
    }
});

// var longBlink = false;
var timesBlinked = 0;
var totalBlinks = 7;
var totalInterations = 4;

function toggleLed() {
    value = value === 0 ? 1 : 0;
    actLed(2, value);
    // if (timesBlinked) {

    // }
}

setInterval(function () {
    setInterval(function () {
        value = value === 0 ? 1 : 0;
        actLed(2, value);    
    },800);
},1800);