const express = require('express');

const router = express.Router();

router.use('/enums', require('./enum/Routes'));
router.use('/users', require('./user/Routes'));
router.use('/userProfiles', require('./userProfile/Routes'));
router.use('/portfolios', require('./portfolio/Routes'));
router.use('/portfolioProfiles', require('./portfolioProfile/Routes'));

module.exports = router;
