const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const companyJobController = require('../controllers/companyJobsController');

router
  .route('/')
  .all(authController.protect)
  .get(companyJobController.getAllCompanyJobs)
  .post(companyJobController.addCompanyJob);

router
  .route('/:companyJobId')
  .all(authController.protect)
  .get(companyJobController.getCompanyJob)
  .delete(companyJobController.deleteCompanyJob)
  .patch(companyJobController.updateCompanyJob);

module.exports = router;
