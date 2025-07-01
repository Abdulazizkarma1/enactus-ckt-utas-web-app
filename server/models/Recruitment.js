import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const RecruitmentSchema = new mongoose.Schema({
  serial: String,
  pin: String,
  studentId: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  lastName: String,
  firstName: String,
  dob: String,
  department: String,
  programme: String,
  zone: String,
  hostel: String,
  phone: String,
  whatsapp: String,
  motivation: String,
  teamInterest: String,
  agreeTerms: Boolean,
  status: { type: String, default: 'Pending' },
  photoUrl: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
RecruitmentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model('Recruitment', RecruitmentSchema);
