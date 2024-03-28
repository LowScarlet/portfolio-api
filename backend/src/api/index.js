const express = require('express');

const router = express.Router();

const auth = require('./auth');
const rest = require('./rest');

router.use('/auth', auth);
router.use('/rest', rest);

module.exports = router;
