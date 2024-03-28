const express = require('express');

const router = express.Router();

const user = require('./user');
const userProfile = require('./userProfile');
const isAuthenticated = require('../auth/model/middlewares/isAuthenticated');

router.use('/users', [
  isAuthenticated
], user);

router.use('/userProfiles', [
  isAuthenticated
], userProfile);

module.exports = router;
