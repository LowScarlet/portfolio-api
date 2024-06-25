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
router.use('/socialMedias', require('./socialMedia/Routes'));

router.use('/portfolioEducations', require('./portfolioEducation/Routes'));
router.use('/institutions', require('./institution/Routes'));
router.use('/departments', require('./department/Routes'));
router.use('/degrees', require('./degree/Routes'));
router.use('/technicalSkills', require('./technicalSkill/Routes'));
router.use('/companies', require('./company/Routes'));

module.exports = router;
