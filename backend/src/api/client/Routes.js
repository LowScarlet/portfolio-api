const express = require('express');

const router = express.Router();

router.use('/@me', require('./@me/Routes'));

module.exports = router;
