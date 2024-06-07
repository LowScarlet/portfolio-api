/* eslint-disable no-unused-vars */
const { rateLimit } = require('express-rate-limit');
const express = require('express');
const { IsAuthenticated } = require('./auth/Middlewares');
const { AuthRateLimit } = require('./auth/Services');

const router = express.Router();

// Initial Custom Request :<
router.use((req, res, next) => {
  req.scarlet = {
    params: {},
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
  //
], require('./oauth/Routes'));

router.use('/client', [
  IsAuthenticated
], require('./client/Routes'));

router.use('/rest', [
  // IsAuthenticated // Test Only
], require('./rest/Routes'));

module.exports = router;
