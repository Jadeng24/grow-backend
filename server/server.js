require('dotenv').config();
const axios = require('axios'),
    express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => { console.log(req.method, req.url); next(); });

/**
 * Endpoints
 */
app.get('/people', function (req, res, next) {
    axios.get('https://swapi.co/api/people').then(response => {
       
        res.status(200).send(response.data);
    });
});

app.get('/planets', function (req, res, next) {
    axios.get('https://swapi.co/api/planets/').then(response => {

        res.status(200).send(response.data);
    });
});


const PORT = 3005;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
