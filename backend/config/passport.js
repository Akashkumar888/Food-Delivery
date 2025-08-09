const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
console.log("Callback URL from env:", process.env.GOOGLE_CALLBACK_URL);


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
},
async (accessToken, refreshToken, profile, done) => {
  console.log("Inside verify callback:", process.env.GOOGLE_CALLBACK_URL);
  try {
    let user = await userModel.findOne({ email: profile.emails[0].value });

    if (!user) {
      user = await userModel.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        profilePic: profile.photos[0].value
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
