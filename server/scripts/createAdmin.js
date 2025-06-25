import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const hashed = await bcrypt.hash('admin123', 10);
  const admin = new Admin({ username: 'admin', password: hashed });
  await admin.save();
  console.log('✅ Admin created');
  mongoose.disconnect();
};

createAdmin();
