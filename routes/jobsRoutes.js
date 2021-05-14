const express = require('express');
const authController = require('../controllers/authController');
const jobsController = require('../controllers/jobsController');

const router = express.Router();

router
  .route('/')
  .all(authController.protect)
  .get(jobsController.getAllJobs)
  .post(jobsController.addNewJob)
  .delete(jobsController.deleteJob)
  .patch(jobsController.updateJob);

module.exports = router;
