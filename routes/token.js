'use strict';

const express = require('express');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const router = express.Router();



router.get('/token', (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err){
      return res.send(false);
    }
    res.send(true);
  })
})

module.exports = router;
