import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  username: String,
  password: String // hashed!
});

export default mongoose.model('Admin', AdminSchema);
