const express = require('express');

const router = express.Router();

router.use('/users', require('./user/Routes'));
router.use('/userProfiles', require('./userProfile/Routes'));

module.exports = router;
