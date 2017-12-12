'use strict';

const express = require('express');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = express.Router();

router.get('/users', (req, res) => {
  console.log("users");
  
})

router.post('/users', (req, res, next) => {
  console.log("user post");
  const data = JSON.parse(req.body.data)
  const { username, email, password } = data;

  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  if (!password || !password.trim()) {
    return next(boom.create(400, 'Password must not be blank'));
  }

  // my attempt to user prexistence verify, but the galvanize example includes it with a bcrypt call which looks cleaner
  // if (knex('users').where('email', email)){
  //   throw boom.create(400, 'An account with that email already exists, please sign in')
  // }
  knex('users')
  .where('email', email)
  .first()
  .then((user) => {
    if (user) {
      throw boom.create(400, 'An account with that email already exists, please sign in')
    }
    return bcrypt.hash(password, 12);
  })
  .then((hashedPassword) => {
    const newUser = { username, email, hashedPassword };

    return knex('users').insert(decamelizeKeys(newUser), '*');
  })
  .then((rows) => {
    const user = camelizeKeys(rows[0]);
    const claim = { userId: user.id };
    const token = jwt.sign(claim, process.env.JWT_KEY, {
      expiresIn: '7 days'
    });

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
      secure: router.get('env') === 'production'
    });

    delete user.hashedPassword;

    res.send(user);
  })
  .catch((err) => {
    next(err);
});
})




module.exports = router;
