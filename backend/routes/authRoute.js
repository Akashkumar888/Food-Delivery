const express = require('express');
const { googleAuth, googleCallback, logoutUser } = require('../controllers/authController');

const router = express.Router();

// Google login
router.get('/google', googleAuth);

// Google callback
router.get('/google/callback', googleCallback);

// Logout
router.post('/logout', logoutUser);

module.exports = router;
