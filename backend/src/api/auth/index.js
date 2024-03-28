const { Router } = require('express');

const router = Router();

const login = require('./routes/login');
const register = require('./routes/register');
const logout = require('./routes/logout');
const verify = require('./routes/verify');

router.use('/login', login);
router.use('/register', register);
router.use('/logout', logout);
router.use('/verify', verify);

module.exports = router;
