const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  dateOfBirth: Date,
  location: {
    longitude: Number,
    latitude: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
