var express = require('express');
var router = express.Router();
var messageController = require('../../../controllers/api/v1/messages');

router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.getOneMessage);

router.post('/', messageController.postMessage);
router.put('/:id', messageController.putMessage);
router.delete('/:id', messageController.deleteMessage);

module.exports = router;




