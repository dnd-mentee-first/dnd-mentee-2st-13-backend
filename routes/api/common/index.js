const express = require('express');
const router = express.Router();

const controller = require('./common.controller');

router.get('/setArea', controller.setArea);
router.get('/setSigungu', controller.setSigungu);

module.exports = router;