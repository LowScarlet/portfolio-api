const express = require('express');
const { IsAuthenticated } = require('../auth/Middlewares');

const router = express.Router();

router.use('/user', [
  IsAuthenticated
], require('./user/Routes'));

router.use('/portfolios', require('./portfolios/Routes'));

module.exports = router;
