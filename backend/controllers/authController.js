const passport = require('passport');
const jwt = require('jsonwebtoken');

// Step 1: Google login (redirect user to Google)
const googleAuth = passport.authenticate("google", {
  scope: ['profile', 'email']
});

// Step 2: Google callback (Google redirects here after login)
const googleCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/' }, (err, user) => {
    if (err || !user) {
      return res.redirect('/');
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL}/login-success?token=${token}`);
  })(req, res, next);
};

// Step 3: Logout
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

