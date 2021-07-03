const mongoose = require('mongoose');

const companyDetailSchema = new mongoose.Schema(
  {
    jobPosition: {
      type: String,
    },
    jobCompany: {
      type: String,
    },
    jobLocation: {
      type: String,
    },
    jobCategory: {
      type: String,
    },
    jobTags: {
      type: [String],
    },
    jobDescription: {
      type: String,
    },
    maxSalary: {
      type: String,
    },
    minSalary: {
      type: String,
    },
    currency: {
      type: String,
    },
    salaryInterval: {
      type: String,
    },
    jobUrl: {
      type: String,
    },
    jobToEmail: {
      type: String,
    },
    companyLogoUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const companyJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true],
  },
  companyJobsDetails: [companyDetailSchema],
});

const CompanyJobs = mongoose.model('CompanyJobs', companyJobSchema);

module.exports = CompanyJobs;
