import mongoose from 'mongoose';

const RecruitmentSchema = new mongoose.Schema({
  serial: String,
  pin: String,
  studentId: String,
  password: String,
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
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Recruitment', RecruitmentSchema);
