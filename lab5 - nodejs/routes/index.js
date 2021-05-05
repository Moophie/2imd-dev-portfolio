var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
const url = require('url');

/* GET home page. */
router.get('/', function (req, res, next) {

  const dev = process.env.NODE_ENV !== 'production';
  const server = dev ? 'http://localhost:3000/' : 'https://nodejs-exercise-api.herokuapp.com/';

  fetch(`${server}api/v1/messages`)
    .then(response => response.json())
    .then(data => {
      $messages = data;
      res.render('index', { title: 'MessageAPI', messages: $messages })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

module.exports = router;
