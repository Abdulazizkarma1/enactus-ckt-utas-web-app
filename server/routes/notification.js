import express from 'express';
import nodemailer from 'nodemailer';
import twilio from 'twilio';
import Recruitment from '../models/Recruitment.js';

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

export default router;
