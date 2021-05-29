const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const app = express();
const compiler = webpack(webpackConfig);
const bodyParser = require('body-parser');
const request = require('request');
var firebaseAdmin = require('firebase-admin');

// Initialize Firebase
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(config.firebaseAdmin),
  databaseURL: "https://just-trying-stuff-bcd1f.firebaseio.com"
});

app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./src/routes')(app, firebaseAdmin);
const server = app.listen(8080, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.use(express.static(__dirname + '/public'));
 
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));