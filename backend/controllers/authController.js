
const passport = require('passport');

// Google Login Controller
const googleAuth = passport.authenticate("google", {
  scope: ['profile', 'email']
});

// Google Callback Controller
const googleCallback = passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/',
});

// Logout Controller
const logoutUser = (req, res, next) => {
  req.logOut(function (err) {
    if (err) return next(err);
    res.redirect('/');
  });
};

module.exports = {
  googleAuth,
  googleCallback,
  logoutUser
};

