'use strict'
const Authentication = require('./controller/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

const requieAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){
  // app.post('/signup', Authentication.signup);
  app.get('/', requieAuth, function (req, res){
    res.send({ message: 'Finish lesson but i do not known'});
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
