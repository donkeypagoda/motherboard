'use strict';

const express = require('express');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const router = express.Router();



router.get('/token', (req, res) => {
  console.log("token");
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err){
      return res.send(false);
    }
    res.send(true);
  })
})

// router.post('/token', (req, res, next) => {
//   const { email, password } = req.body;
//
//   if (!email || !email.trim()) {
//     return next(boom.create(400, 'Email must not be blank'));
//   }
//
//   if (!password || !password.trim()) {
//     return next(boom.create(400, 'Password must not be blank'));
//   }
//
//   let user;
//
//   knex('users')
//     .where('email', email)
//     .first()
//     .then((row) => {
//       if (!row) {
//         throw boom.create(400, 'Bad email or password');
//       }
//
//       user = camelizeKeys(row);
//
//       return bcrypt.compare(password, user.hashedPassword);
//     })
//     .then(() => {
//       const claim = { userId: user.id };


module.exports = router;
