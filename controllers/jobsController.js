const mongoose = require('mongoose');
const User = require('../models/userModel');
const Jobs = require('../models/jobModel');
const CompanyJobs = require('../models/companyJobModel');

const ObjectId = mongoose.Types.ObjectId;

exports.getAllJobs = async (req, res, next) => {
  console.log(req.query);
  try {
    // const jobsList = await Jobs.find({ userId: req.user._id });

    const companyJobs = await CompanyJobs.aggregate([
      { $unwind: '$companyJobsDetails' },
    ]);
    console.log('xoxo-----------------------', companyJobs);
    if (companyJobs) {
      // const companyJobArray = companyJobs.map(
      //   (comp) => comp.companyJobsDetails
      // );
      // console.log(companyJobArray);
      return res.status(201).json({
        status: '1',
        results: companyJobs.length,
        data: companyJobs,
      });
    }
    // console.log({ companyJobs });

    // if (jobsList.length) {
    //   res.status(200).json({
    //     status: '1',
    //     results: jobsList[0].jobs.length,
    //     data: jobsList[0].jobs,
    //   });
    // } else {
    //   res.status(200).json({
    //     status: '1',
    //     data: [],
    //     message: 'No Jobs',
    //   });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: '0',
    });
  }
};

exports.getJob = (req, res, next) => {
  try {
  } catch (error) {}
};

exports.addNewJob = async (req, res, next) => {
  try {
    const user = await User.find({ _id: req.user._id });
    if (user.length === 0) {
      const jobDetails = new Jobs({
        userId: req.user._id,
        jobs: req.body.jobDetails,
      });
      const result = await jobDetails.save();

      res.status(201).json({
        status: '1',
        message: 'Add New Job',
        data: result.jobs,
      });
    } else {
      const result = await Jobs.findOneAndUpdate(
        { userId: req.user._id },
        {
          $push: {
            jobs: req.body.jobDetails,
          },
        },
        { upsert: true, new: true }
      );

      console.log({ result });

      res.status(201).json({
        status: '1',
        message: 'Add New Job ',
        data: result.jobs,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: '0',
      message: err,
    });
  }
};

exports.updateJob = (req, res, next) => {
  try {
  } catch (error) {}
};

exports.deleteJob = (req, res, next) => {
  try {
  } catch (error) {}
};
