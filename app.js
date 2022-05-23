const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const{estrategiasAtenticacao} = require('./src/usuarios/index');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

module.exports = app;
