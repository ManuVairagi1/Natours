/* eslint-disable new-cap */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//name , email , photo , password , passwordConfirm

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'It must have a name'],
  },
  email: {
    type: String,
    required: [true, 'It must have a email'],
    lowercase: true,
    unique: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'It must have a password'],
  },

  passwordConfirm: {
    type: String,
    required: [true, 'It must confirm'],
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
