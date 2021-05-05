var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");

/* GET home page. */
router.get('/', function (req, res, next) {
  var messages;

  fetch('http://localhost:3000/api/v1/messages/')
    .then(response => response.json())
    .then(data => $messages = data);

  res.render('index', { title: 'MessageAPI', messages: $messages });
});

module.exports = router;
