const User = require('../models/userModel');

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
};

exports.updateUser = (req, res) => {
  res.status(504).json({
    status: 'not Connected',
    message: 'This route is not yet defined',
  });
};
exports.deleteUser = (req, res) => {
  res.status(504).json({
    status: 'not Connected',
    message: 'This route is not yet defined',
  });
};

exports.getUser = (req, res) => {
  res.status(504).json({
    status: 'not Connected',
    message: 'This route is not yet defined',
  });
};
exports.createUser = (req, res) => {
  res.status(504).json({
    status: 'not Connected',
    message: 'This route is not yet defined',
  });
};
