// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  isDoctor: {
    type: Boolean,
    default: false, // You can add a default value if required
  },
  specialisation: {
    type: String,
    trim: true,
  },
  charge: {
    type: Number,
    min: 0, // Optional validation to ensure the charge is non-negative
  },
  description: {
    type: String,
    trim: true,
  },
  caseCount: {
    type: Number,
    min: 0, // Optional validation to ensure caseCount is non-negative
    default: 0, // You can add a default if it starts at 0
  },
  password: {
    type: String,
    required: true,
  },

  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
},  {
  timestamps: true // This will add createdAt and updatedAt fields
},);


const User = mongoose.model('User', userSchema);

export default User;
