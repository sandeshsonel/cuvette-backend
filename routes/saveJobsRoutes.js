const express = require('express');
const Router = express.Router();

const saveJobsController = require('../controllers/saveJobsController');

Router.route('/')
  .get(saveJobsController.getAllUserSaveJobs)
  .post(saveJobsController.postSaveUserJob)
  .delete(saveJobsController.deleteSaveUserJob);

module.exports = Router;
