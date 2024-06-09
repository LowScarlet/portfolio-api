const express = require('express');

const router = express.Router();

// Enums Model
router.use('/enums', require('./enum/Routes'));

// Users Model
router.use('/users', require('./user/Routes'));
router.use('/userProfiles', require('./userProfile/Routes'));

// Portfolios Model
router.use('/portfolios', require('./portfolio/Routes'));
router.use('/portfolioProfiles', require('./portfolioProfile/Routes'));
router.use('/portfolioConnects', require('./portfolioConnect/Routes'));

// Social Media Model
router.use('/socialMedias', require('./socialMedia/Routes'));

module.exports = router;
