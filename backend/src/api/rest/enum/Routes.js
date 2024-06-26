const { Router } = require('express');
const { Role, OneTimePasswordType, DegreeLevel } = require('@prisma/client');

const router = Router();

router.get('/role', [
  //
], async (req, res, next) => {
  try {
    res.json(Role);
  } catch (err) {
    next(err);
  }
});

router.get('/oneTimePasswordType', [
  //
], async (req, res, next) => {
  try {
    res.json(OneTimePasswordType);
  } catch (err) {
    next(err);
  }
});

router.get('/degreeLevel', [
  //
], async (req, res, next) => {
  try {
    res.json(DegreeLevel);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
