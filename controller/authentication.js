'use strict'
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user){
  const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
exports.signin = function(req, res, next){
  res.send({ token: tokenForUser(req.user)});
}
exports.signup = function (request, response, next){
  const email = request.body.email;
  const password = request.body.password;
  if(!email || !password){
    response.status(422).send({ error:' You must provide email and password' })
  }
  // if email is exists
  User.findOne({ email: email }, function (err, existUser) {
    if(err){return next(err);}

// if email is not exist, after create new record
    if(existUser){
      return response.status(422).send({ error: 'This email is use' });
    }

    const user = new User({
      email: email,
      password: password
    });
    user.save(function (error) {
      if(error) {return next(err);}
      // response after create user
      response.json({ token: tokenForUser(user) });
    });
  });

}
