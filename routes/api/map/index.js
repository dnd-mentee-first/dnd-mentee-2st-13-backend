const express = require('express');
const router = express.Router();

const controller = require('./map.controller');

router.get('/placeReplyList/:id',controller.placeReplyList);
router.post('/placeNewReply',controller.placeNewReply);
router.put('/placeEditReply/:id',controller.placeEditReply);
router.delete('/placeDeleteReply/:id',controller.placeDeleteReply);

module.exports = router;``