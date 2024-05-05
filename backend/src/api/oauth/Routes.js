const express = require('express');

const router = express.Router();

router.use('/google', require('./google/Routes'));

module.exports = router;
