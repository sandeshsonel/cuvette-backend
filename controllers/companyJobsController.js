const mongoose = require('mongoose');
const CompanyJobs = require('../models/companyJobModel');

const ObjectId = mongoose.Types.ObjectId;

exports.getAllCompanyJobs = async (req, res, next) => {
  try {
    const companyJobs = await CompanyJobs.find({
      userId: Object(req.user._id),
    });
    return res.status(200).json({
      status: '1',
      data: companyJobs,
    });
  } catch (error) {
    res.status(500).json({
      status: '0',
      message: error,
    });
  }
};

exports.getCompanyJob = async (req, res, next) => {
  try {
    const { companyJobId } = req.params;
    const companyJob = await CompanyJobs.find({
      $and: [
        { userId: req.user._id },
        { 'companyJobsDetails._id': ObjectId(companyJobId) },
      ],
    });
    return res.status(200).json({
      status: '1',
      data: companyJob[0].companyJobsDetails,
    });
  } catch (error) {
    res.status(500).json({
      status: '0',
      message: error,
    });
  }
};

exports.addCompanyJob = async (req, res, next) => {
  try {
    const companyUser = await CompanyJobs.find({
      userId: ObjectId(req.user._id),
    });
    if (companyUser.length) {
      const comp = await CompanyJobs.findOneAndUpdate(
        { userId: ObjectId(req.user._id) },
        {
          $push: { companyJobsDetails: req.body },
        },
        { upsert: true, new: true }
      );
      return res.status(200).json({
        message: 'Company Job Add',
        status: '1',
        data: comp.companyJobsDetails,
      });
    } else {
      const comp = await CompanyJobs.create({
        userId: req.user._id,
        companyJobsDetails: req.body,
      });
      return res.status(200).json({
        message: 'Company Job Add',
        status: '1',
        data: comp.companyJobsDetails,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: '0',
      message: error,
    });
  }
};

exports.updateCompanyJob = async (req, res, next) => {
  try {
    const { companyJobId } = req.params;
    let _updateItem = {};
    Object.keys(req.body).forEach((k) => {
      _updateItem[`companyJobsDetails.$.${k}`] = req.body[k];
    });

    const comp = await CompanyJobs.findOneAndUpdate(
      {
        userId: req.user._id,
        'companyJobsDetails._id': companyJobId,
      },
      {
        $set: _updateItem,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      status: '1',
      message: 'Update Company Job',
      data: comp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: '0',
      message: error,
    });
  }
};

exports.deleteCompanyJob = async (req, res, next) => {
  try {
    const { companyJobId } = req.params;
    const comp = await CompanyJobs.updateOne(
      { userId: req.user._id },
      { $pull: { companyJobsDetails: { _id: companyJobId } } }
    );
    return res.status(201).json({
      status: '1',
      message: 'Company Job Deleted',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: '0',
      message: error,
    });
  }
};
