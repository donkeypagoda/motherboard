'use strict';

const express = require('express');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const camelizeKeys = require('humps')
const router = express.Router();

router.get('/users', (req, res) => {
  console.log("users");
})




module.exports = router;
