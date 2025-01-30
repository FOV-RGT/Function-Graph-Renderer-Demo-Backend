const express = require('express');
const router = express.Router();
const { mathData } = require('../models');
const { success, failure } = require('../utils/responses');
const user = require('../models/user');
const jwt = require('jsonwebtoken');

router.get('/', async function (req, res, next) {

  try {
    
  } catch (error) {
    failure(res, error);
  }
});

module.exports = router;