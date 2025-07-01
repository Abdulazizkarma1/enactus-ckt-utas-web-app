import mongoose from 'mongoose';

const ExecutiveRecordSchema = new mongoose.Schema({
  academicYear: {
    type: String,
    required: true,
    unique: true,
  },
  members: [
    {
      name: String,
      role: String,
      photoUrl: String,
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ExecutiveRecord', ExecutiveRecordSchema);
