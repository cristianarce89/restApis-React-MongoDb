const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

//conectar mongo
// 1)npm install --save mongoose
// 2) se importa const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/restapis', {
    useNewUrlParser: true
});

//crear el servidor
const app = express();

//hablilitar bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Rutas de la app
app.use('/', routes());


// puerto
app.listen(5000);

