'use strict';

const express = require('express');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const router = express.Router();

// router.post('/users', (req, res, next) => {
//   knex('users').where('email', req.body.email).first()
//     .then((row) => {
//       if (row) {
//         return next(boom.create(400, 'Email is already registered to a user.'));
//       }
//       bcrypt.hash(req.body.password, 12)
//         .then((password) => {
//           const newUser = {'email': req.body.email, 'username': req.body.username, 'email': req.body.email, 'hashed_password': password};
//           return knex('users').insert(newUser, '*')
//         })
//         .then((result) => {
//           result = result[0];
//           delete result.password;
//           console.log(result)
//           res.send(result);
//         })
//         .catch((err) => {
//           return next(err);
//         })
//     })
//     .catch((err) => {
//       return next(err);
//     })
// })
//
// router.get('/users/:id', (req, res, next) => {
//   knex('users')
//     .where('id', req.params.id)
//     .first()
//     .then((user) => {
//       res.send(user)
//     })
//     .catch((err) => next(err))
// })
// router.get('/users', (req, res, next) => {
//   knex('users')
//     .select('id')
//     .then((user) => {
//       res.send(user)
//       console.log(user);
//     })
//     .catch((err) => next(err))
// })


module.exports = router;
