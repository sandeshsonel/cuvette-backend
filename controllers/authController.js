const { promisify } = require('util');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const alreadyUser = await User.find({ email: req.body.email });
    if (alreadyUser.length) {
      return res.status(200).json({
        status: '0',
        message: 'You already register, Please login',
      });
    } else {
      let userObj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        userType: req.body.userType,
      };
      if (req.body.userType === 'employer') {
        userObj.companyName = req.body.companyName;
      }
      const newUser = await User.create(userObj);

      const token = signToken(newUser._id);
      res.status(201).json({
        status: '1',
        token,
        data: newUser,
        message: 'User Created Successfully',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: '0',
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: '0',
        message: 'Please provide email and password',
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(200).json({
        status: '0',
        message: 'Email not found, Please register',
      });
    }
    const correct = await user.correctPassword(password, user.password);

    if (!correct) {
      return res.status(200).json({
        status: '0',
        message: 'Incorrect email or password',
      });
    }

    const token = signToken(user._id);

    const userObj = JSON.parse(JSON.stringify(user));

    return res.status(200).json({
      status: '1',
      token,
      data: {
        firstName: userObj.firstName,
        lastName: userObj.lastName,
        email: userObj.email,
        photo: userObj.photo,
        phoneNumber: userObj.phoneNumber,
        companyName: userObj.companyName,
        userType: userObj.userType,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: '0',
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  console.log(req.headers);
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: 'failure',
        message: 'You are not logged in! Please log in to get access.',
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log({ decoded });
    let user = await User.find(ObjectId(decoded.id));
    req.user = user[0];
    next();
  } catch (err) {
    console.log(err);
  }
};
