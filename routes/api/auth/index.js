const express = require('express');
const router = express.Router();

const controller = require('./auth.controller');

router.post('/login', controller.loginCheck);
router.post('/register', controller.createUser);
router.get('/check', controller.check);
//router.post('/assign-admin/:username', controller.assignAdmin)

module.exports = router;
