const express = require('express');

const router = express.Router();

const user = require('./user');
const userProfile = require('./userProfile');

router.use('/users', user);
router.use('/userProfiles', userProfile);

module.exports = router;
