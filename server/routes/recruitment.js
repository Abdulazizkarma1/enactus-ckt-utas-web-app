import express from 'express';
import Recruitment from '../models/Recruitment.js';
import Voucher from '../models/Voucher.js';

const router = express.Router();

// @route   PUT api/recruitment/change-status/:id
// @desc    Change recruitment status
// @access  Private/Admin
router.put('/change-status/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const recruit = await Recruitment.findById(id);
    if (!recruit) {
      return res.status(404).json({ msg: 'Recruit not found' });
    }
    recruit.status = status;
    await recruit.save();
    res.json({ msg: 'Status updated', status: recruit.status });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/recruitment/validate-voucher
// @desc    Validate a recruitment voucher
// @access  Public
router.post('/validate-voucher', async (req, res) => {
  const { serialNumber, pin } = req.body;

  try {
    const voucher = await Voucher.findOne({ serialNumber, pin });
    if (!voucher) {
      return res.status(400).json({ msg: 'Invalid voucher credentials' });
    }
    if (voucher.isUsed) {
      return res.status(400).json({ msg: 'Voucher has already been used' });
    }
    res.json({ msg: 'Voucher is valid' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/recruitment/setup-credentials
// @desc    Set up student credentials
// @access  Public
router.post('/setup-credentials', async (req, res) => {
  const { voucherSerialNumber, pin, studentId, password } = req.body;

  try {
    // Validate voucher
    const voucher = await Voucher.findOne({ serialNumber: voucherSerialNumber, pin });
    if (!voucher) {
      return res.status(400).json({ msg: 'Invalid voucher credentials' });
    }
    if (voucher.isUsed) {
      return res.status(400).json({ msg: 'Voucher has already been used' });
    }

    // Check if student ID already exists
    let student = await Recruitment.findOne({ studentId });
    if (student) {
      return res.status(400).json({ msg: 'Student ID already exists' });
    }

    // Create new recruitment record
    student = new Recruitment({
      serial: voucherSerialNumber,
      pin,
      studentId,
      password,
    });

    await student.save();

    // Mark voucher as used
    voucher.isUsed = true;
    await voucher.save();

    res.status(201).json({ msg: 'Credentials set up successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

import bcrypt from 'bcryptjs';

// @route   PUT api/recruitment/submit-application
// @desc    Submit full recruitment application
// @access  Public
router.put('/submit-application', async (req, res) => {
  const { studentId, password, ...formData } = req.body;

  try {
    let student = await Recruitment.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // If password provided, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      formData.password = hashedPassword;
    }

    // Update student record
    student = await Recruitment.findOneAndUpdate({ studentId }, { $set: formData }, { new: true });

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
