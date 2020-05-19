const express = require('express');
const router = express.Router();

const user = require('./api');

router.use('/api', user);


/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

module.exports = router;
