import express from 'express';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import Recruitment from '../models/Recruitment.js';
import Admin from '../models/Admin.js';
import Voucher from '../models/Voucher.js';
import bcrypt from 'bcryptjs';
import { isAdmin } from '../middleware/auth.js';
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

router.post('/send-confirmation', async (req, res) => {
  const { email, phone, name } = req.body;

  try {
    // Email
    await transporter.sendMail({
      from: `"Enactus CKT-UTAS" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Enactus Application Submitted',
      html: `<p>Dear ${name},<br/>We have received your application. Stay tuned for interview updates!</p>`,
    });

    // SMS
    await twilioClient.messages.create({
      body: `Hello ${name}, your Enactus application has been received. Interview details soon.`,
      from: process.env.TWILIO_PHONE,
      to: `+233${phone.slice(-9)}`, // assumes Ghana format
    });

    res.status(200).json({ message: 'Notifications sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send notifications' });
  }
});



router.post('/submit-recruitment', async (req, res) => {
  try {
    const newEntry = new Recruitment(req.body);
    await newEntry.save();
    res.status(200).json({ message: 'Recruitment data saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save data' });
  }
});

router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    req.session.adminId = admin._id;
    res.status(200).json({ message: 'Logged in' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/admin-data', isAdmin, async (req, res) => {
  const data = await Recruitment.find();
  res.json(data);
});

router.put('/change-status/:id', isAdmin, async (req, res) => {
  const { status } = req.body;
  try {
    await Recruitment.findByIdAndUpdate(req.params.id, { status });
    res.status(200).json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
});

// Voucher routes

// Generate new voucher
router.post('/vouchers', isAdmin, async (req, res) => {
  const { serialNumber, pin } = req.body;
  try {
    const existing = await Voucher.findOne({ serialNumber });
    if (existing) {
      return res.status(400).json({ message: 'Serial number already exists' });
    }
    const voucher = new Voucher({ serialNumber, pin });
    await voucher.save();
    res.status(201).json(voucher);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create voucher' });
  }
});

// Get all vouchers
router.get('/vouchers', isAdmin, async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.json(vouchers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch vouchers' });
  }
});

// Delete voucher
router.delete('/vouchers/:id', isAdmin, async (req, res) => {
  try {
    await Voucher.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Voucher deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete voucher' });
  }
});

// Toggle voucher active/inactive
router.put('/vouchers/:id/toggle', isAdmin, async (req, res) => {
  try {
    const voucher = await Voucher.findById(req.params.id);
    if (!voucher) {
      return res.status(404).json({ message: 'Voucher not found' });
    }
    voucher.status = voucher.status === 'active' ? 'expired' : 'active';
    await voucher.save();
    res.status(200).json(voucher);
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle voucher status' });
  }
});

// Validate voucher (serialNumber + pin)
router.post('/vouchers/validate', async (req, res) => {
  const { serialNumber, pin } = req.body;
  try {
    const voucher = await Voucher.findOne({ serialNumber, pin });
    if (!voucher) {
      return res.status(400).json({ valid: false, message: 'Invalid voucher' });
    }
    if (voucher.status !== 'active') {
      return res.status(400).json({ valid: false, message: 'Voucher is not active' });
    }
    if (voucher.used) {
      return res.status(400).json({ valid: false, message: 'Voucher already used' });
    }
    res.json({ valid: true, message: 'Voucher is valid' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to validate voucher' });
  }
});




export default router;
