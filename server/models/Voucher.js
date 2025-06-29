import mongoose from 'mongoose';

const voucherSchema = new mongoose.Schema({
  serialNumber: {
    type: String,
    required: true,
    unique: true,
  },
  pin: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired'],
    default: 'active',
  },
  used: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Voucher = mongoose.model('Voucher', voucherSchema);

export default Voucher;
