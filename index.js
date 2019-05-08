const express = require('express');
const bodyParser = require('body-parser');
const { appParams } = require('./app/utils/config');
const peopleRouter = require('./app/routers/peopleRouter');
const cors = require('cors');

const app = express();

const allowCrossDomain = function(req, res, next) {
    // TODO: depending on the requirement, this can be changed
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.options('*', cors())

app.get('/', (req, res) => res.send('Bambu API 1.1v'))
app.get('/health', (req, res) => res.send('Health-check: Bambu API 1.1v . Rand: ' + Math.random()))

app.use('/people-like-you', peopleRouter);

const port = appParams.port;
app.listen(port, () => console.log(`API listening on port ${port}!`))