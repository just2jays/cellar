const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const compiler = webpack(webpackConfig);
const bodyParser = require('body-parser');
const request = require('request');
const Api = require ('./api');

app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./src/routes')(app, {});

console.log(routes);

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.use(express.static(__dirname + '/public'));
 
// Mount the REST API
app.use('/api', Api);