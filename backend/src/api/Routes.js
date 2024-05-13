/* eslint-disable no-unused-vars */
const { rateLimit } = require('express-rate-limit');
const express = require('express');
const { IsAuthenticated } = require('./auth/Middlewares');
const { AuthRateLimit } = require('./auth/Services');

const router = express.Router();

// Initial Custom Request :<
router.use((req, res, next) => {
  req.scarlet = {
    param: {},
    query: {},
    body: {},
    pagination: {
      skip: 0,
      take: 10
    }
  };
  next();
});

router.use('/auth', [
  AuthRateLimit
], require('./auth/Routes'));

router.use('/oauth', [
  AuthRateLimit
], require('./oauth/Routes'));

router.use('/client', [
  IsAuthenticated
], require('./client/Routes'));

router.use('/rest', [
  IsAuthenticated
], require('./rest/Routes'));

module.exports = router;
