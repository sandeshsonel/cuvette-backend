const User = require('../models/userModel');

exports.updateUser = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { jobDetails: req.body.jobDetails } }
    );
    const user = await User.find({ _id: req.user._id }).select('-password');
    res.status(200).json({
      status: '1',
      data: user[0],
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await User.find({ _id: req.user._id });
    res.status(200).json({
      success: '1',
      data: user,
    });
  } catch (error) {}
};
