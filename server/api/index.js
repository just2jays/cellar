import express from 'express';
import bodyParser from 'body-parser';
import collections from './collections';

const Api = express();

// always send JSON headers
Api.use((req, res, next) => {
  res.contentType('application/json');
  next();
});

// parse JSON body
Api.use(bodyParser.json());

// Add all API endpoints here
Api.use('/collections', collections);

export default Api;