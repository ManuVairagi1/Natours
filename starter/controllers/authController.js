/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signToken = (id) => {
  jwt.sign({ id }, process.env.JWT_secret, {
    expiresIn: process.env.JWT_expiration,
  });
};
exports.signUp = async (req, res, next) => {
  try {
    // if we write this ,
    //  user can easily give himself a role of admin and everything,
    //  so instead we only provide some specific fields.
    // const newUser = await User.create(req.body);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        User: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // //1) check if email and password exist
    if (!email || !password) return next();

    // //2) check if email and password are correct

    const user = await User.findOne({ email, password });

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next();
    }

    // //3  if everything ok , send token
    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      token,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};
