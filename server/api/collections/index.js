import express from 'express';
import axios from 'axios';
import { get, set, find, isUndefined, isNull } from 'lodash';

const router = express.Router();

router.get('/*', (req, res) => {
  axios
    .get('https://preview.inc.com/rest/articlebundle/199071')
    .then(function(result) {
      return res.json([result.data]);
    });
});

export default router;