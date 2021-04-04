const express = require('express');
const bodyParser = require('body-parser');

const App = express();

const asteroid = require('./routes/asteroid');
const Auth = require('./routes/auth');

const AsteroidToken = require('./middlewares/AuthToken');

App.use(AsteroidToken);


App.use('/asteroid',asteroid);
App.use('/user',User);
App.use('/auth',Auth);


module.exports = App;