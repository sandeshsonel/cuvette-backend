const mongoose = require('mongoose');

const jobDetailSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      default: null,
    },
    jobLocation: {
      type: String,
      default: null,
    },
    jobType: {
      type: Boolean,
      default: false,
    },
    jobMode: {
      type: String,
      enum: ['part-time', 'semi-full-time', 'full-time'],
      default: null,
    },
    stipendRange: {
      type: Array,
      default: [],
      default: null,
    },
    jobstartDate: {
      type: Date,
      default: null,
    },
    jobDuration: {
      type: Number,
      default: null,
    },
    jobDescription: {
      type: String,
      default: null,
    },
    jobSkills: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const jobsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true],
  },
  jobs: [jobDetailSchema],
});

const Jobs = mongoose.model('Jobs', jobsSchema);

module.exports = Jobs;
