import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'server/.env') });

// eslint-disable-next-line no-undef
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  // eslint-disable-next-line no-undef
  await mongoose.connect(process.env.MONGO_URI);
  const hashed = await bcrypt.hash('admin123', 10);
  const admin = new Admin({ username: 'admin', password: hashed });
  await admin.save();
  console.log('✅ Admin created');
  mongoose.disconnect();
};

createAdmin();
