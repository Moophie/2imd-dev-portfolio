var express = require('express');
var router = express.Router();
const messageController = require('../../../controllers/api/v1/messages');

router.get('/', messageController.getAllMessages);
router.get('/:id', messageController.getOneMessage);

router.post('/', messageController.post);
router.put('/:id', messageController.put);
router.delete('/:id', messageController.delete);

module.exports = router;




