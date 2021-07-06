const mongoose = require('mongoose');

const companyJobs = new mongoose.Schema({
  companyId: {
    type: mongoose.Types.ObjectId,
    required: [true],
  },
  companyJobId: {
    type: mongoose.Types.ObjectId,
    required: [true],
  },
});

const saveJobSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true],
  },
  saveJob: [companyJobs],
});

const SaveJobs = mongoose.model('SavedJobs', saveJobSchema);

module.exports = SaveJobs;
