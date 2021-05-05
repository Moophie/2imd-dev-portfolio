var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
const url = require('url');

/* GET home page. */
router.get('/', function (req, res, next) {
  var baseUrl = req.protocol + '://' + req.get('host');  

  fetch(baseUrl + 'api/v1/messages')
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
