'use strict';

const express = require('express');
const boom = require('boom');
const bcrypt = require('bcrypt');
//old code below
// const bcrypt = require('bcrypt-as-promised');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys } = require('humps');
const router = express.Router();

const auth = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = payload;

    next();
  });
};

// test route to go with test.js remove before deploy
router.get('/token', auth, (req, res) => {
  // console.log("token");
  // console.log(req.cookies.token);
})

router.delete('/token', (req, res) => {
  res.clearCookie('token');
  res.send({})  //this is the same
});

router.post('/token', (req, res, next) => {
  const data = JSON.parse(req.body.data)
  const { email, password } = data;

  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  if (!password || !password.trim()) {
    return next(boom.create(400, 'Password must not be blank'));
  }

  let user;

knex('users')
  .where('email', email)
  .first()
  .then((row) => {
    if (!row) {
      throw boom.create(400, 'Bad email or password');
    }

    user = camelizeKeys(row);

    return bcrypt.compare(password, user.hashedPassword);
  })
  .then(() => {
    const claim = { userId: user.id };
    const token = jwt.sign(claim, process.env.JWT_KEY, {
      expiresIn: '7 days'  // Adds an exp field to the payload
    });

    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),  // 7 days
      secure: router.get('env') === 'production'  // Set from the NODE_ENV
    });

    delete user.hashedPassword;

    res.send(user);
  })
  .catch(bcrypt.MISMATCH_ERROR, () => {
    throw boom.create(400, 'Bad email or password');
  })
  .catch((err) => {
    next(err);
  });
});


module.exports = router;
