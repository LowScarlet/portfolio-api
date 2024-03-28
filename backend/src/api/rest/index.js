const express = require('express');

const router = express.Router();

const user = require('./user');
const isAuthenticated = require('../auth/model/middlewares/isAuthenticated');

router.use('/users', [
  isAuthenticated
], user);

module.exports = router;
