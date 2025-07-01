const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Recruitment = require('../models/Recruitment');

// User login
router.post('/login', async (req, res) => {
  const { studentId, password } = req.body;
  try {
    const user = await Recruitment.findOne({ studentId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid student ID or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid student ID or password' });
    }
    req.session.userId = user._id;
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// User logout
router.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ message: 'Logout successful' });
});

// Get user profile
router.get('/profile', async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const user = await Recruitment.findById(req.session.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
