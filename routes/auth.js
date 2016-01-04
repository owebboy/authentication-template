var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

// ------------ //
// REGISTRATION //
// ------------ //

router.get('/register', function(req, res) {
  res.render('auth/register', { active: 'register' });
});

router.post('/register', function(req, res, next) {
  
  // confirm passwords match
  if (req.body.confirm === req.body.password) {
    
    // register account
    
    Account.register(new Account({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name
    }), req.body.password, function(err, account) {
      
      // handle error
      
      if (err) {
        return res.render("auth/register", {
          info: "username already exists!",
          active: 'register'
        });
      }
      
      // save user and authenticate

      passport.authenticate('local')(req, res, function() {
        req.session.save(function(err) {
          if (err) {
            return next(err);
          }
          res.redirect('/');
        });
      });
    });
    
  } else {
    
    // return as error
    return res.render("auth/register", {
      info: "passwords do not match",
      active: 'register'
    });
    
  }
  
});

// ----- //
// LOGIN //
// ----- //

router.get('/login', function(req, res) {
  res.render('auth/login', {
    user: req.user,
    active: 'login'
  });
});

router.post('/login', function(req, res, next) {
  
  // authenticate account
  
  passport.authenticate('local', function(err, user, info) {
    
    // handle error
    if (err) return next(err);
    
    // if no user then return error
    if (!user) { 
      return res.render("auth/login", { 
        info: "username and password do not match!", 
        active: 'login' 
      }); 
    }
    
    // log user in
    
    req.logIn(user, function(err) {
      
      // handle error
      if (err) return next(err);
      
      return res.redirect('/');
      
    });
  })(req, res, next);
});

// ------ //
// LOGOUT //
// ------ //

router.get('/logout', function(req, res, next) {
  req.logout();
  
  req.session.save(function(err) {
    
    // handle error
    
    if (err) return next(err);
    
    res.redirect('/');
    
  });
});

// ------ //
// DELETE //
// ------ //

router.get('/delete', function(req, res, next) {
   Account.findOneAndRemove({ _id: req.user.id }, function (err, account) {
     
     // handle error
     
     if (err) return next(err);
     
     res.redirect('/');
     
   });
});

// ------ //
// UPDATE //
// ------ //

router.get('/update', function(req, res, next) {
   res.render('auth/update', { user: req.user });
});

router.post('/update', function(req, res, next) {
   Account.findOneAndUpdate({ _id: req.user.id }, {
    email: req.body.email,
    name: req.body.name,
    username: req.body.username
   }, function(err, account) {
     
     // handle error
     
     if (err) return next(err);
     
     res.redirect('/update');
     
   });
});

module.exports = router;
