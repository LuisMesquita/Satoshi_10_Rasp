const express = require('express')
const app = express()

const port = 3000
app.listen(port, () => console.log('Server running on port ' + port))

app.post('/', (req, res) => {
	const { success } = req.body
	console.log(success)
	if (success) {
		actLed(1, 1)
		console.log('sucesso')
	} else {
		actLed(3,1)
		console.log('falha')
	}

	res.send('ligou')
})

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

setInterval(function () {
    setInterval(function () {
        value = value === 0 ? 1 : 0;
        actLed(2, value);    
    },800);
},1800);