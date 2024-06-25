const express = require('express');

const router = express.Router();

router.use('/user', require('./user/Routes'));
router.use('/portfolios', require('./portfolios/Routes'));

module.exports = router;
