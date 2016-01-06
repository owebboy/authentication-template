var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

// ------------- //
// [SETUP ADMIN] //
// ------------- //

router.get('/setup', function (req, res, next) {

  Account.find({ role: 'admin' }, function (err, account) {

    // handle error
    if (err) return next(err);

    console.log(account);

    // check if first admin
    if (account === null) {

      console.log('account found... rejecting');

      res.redirect('/');

    } else {

      console.log('no account found... creating user');

      // register account
      Account.register(new Account({
        username: 'admin',
        name: 'Administrator'
      }), 'admin', function(err, account) {

        // handle error
        if (err) return next(err);

        // save user and authenticate
        passport.authenticate('local')(req, res, function() {
          req.session.save(function(err) {
            if (err) return next(err);
            res.redirect('/admin');
          });
        });
      });

    }

  });

});

// ------------ //
// [ADMIN HOME] //
// ------------ //

router.get('/', ensureAuthenticated, function (req, res, next) {
  // check if admin
  if (req.user.role === 'admin') {

    // find accounts
    Account.find({}, function (err, account) {

      // handle error
      if (err) return next(err);

      // render admin
      res.render('admin', {
        user: req.user,
        account: account
      });

    });
  } else {

    // return to home (not an admin)
    res.redirect('/');

  }
});

// ------------------ //
// [PROMOTE TO ADMIN] //
// ------------------ //

router.get('/promote/:id', ensureAuthenticated, function (req, res, next) {

  // check if admin
  if (req.user.role === 'admin') {

    // find account and update
    Account.findOneAndUpdate({ _id: req.params.id }, {
      role: 'admin'
    }, function (err, account) {

      // handle error
      if (err) return next(err);

      // redirect to admin home
      res.redirect('/admin');

    })

  } else {

    // return to home (not an admin)
    res.redirect('/');

  }

});

// ------------------- //
// [DEMOTE FROM ADMIN] //
// ------------------- //

router.get('/demote/:id', ensureAuthenticated, function (req, res, next) {

  // check if admin
  if (req.user.role === 'admin') {

    // find account and update
    Account.findOneAndUpdate({ _id: req.params.id }, {
      role: null
    }, function (err, account) {

      // handle error
      if (err) return next(err);

      // redirect to admin home
      res.redirect('/admin');

    })

  } else {

    // return to home (not an admin)
    res.redirect('/');

  }

});

// ---------------- //
// [UPDATE ACCOUNT] //
// ---------------- //

router.post('/update/:id', ensureAuthenticated, function (req, res, next) {

  // check if admin
  if (req.user.role === 'admin') {

    // find account and update
    Account.findOneAndUpdate({ _id: req.params.id }, {
      username: req.body.username,
      email: req.body.email,
      name: req.body.name,
      role: req.body.role
    }, function (err, account) {

      // handle error
      if (err) return next(err);

      // redirect to admin home
      res.redirect('/admin');

    });

  } else {

    // return to home (not an admin)
    res.redirect('/');

  }

});

// ---------------- //
// [REMOVE ACCOUNT] //
// ---------------- //

router.post('/remove/:id', ensureAuthenticated, function (req, res, next) {

  // check if admin
  if (req.user.role === 'admin') {

    // find account and update
    Account.findOneAndRemove({ _id: req.params.id }, function (err, account) {

      // handle error
      if (err) return next(err);

      // redirect to admin home
      res.redirect('/admin');

    });

  } else {

    // return to home (not an admin)
    res.redirect('/');

  }

});

// ensure authentication.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect('/auth/login');
  }
}

module.exports = router;
