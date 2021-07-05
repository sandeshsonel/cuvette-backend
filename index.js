const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 8000;

const usersRoutes = require('./routes/usersRoutes');
const jobsRoutes = require('./routes/jobsRoutes');
const companyJobsRoutes = require('./routes/companyJobsRoutes');
const saveJobsRoutes = require('./routes/saveJobsRoutes');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//  ROUTES
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/jobs', jobsRoutes);
app.use('/api/v1/companyJobs', companyJobsRoutes);
app.use('/api/v1/savedJobs', saveJobsRoutes);

app.use('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('Database Connection Successfully..');
  })
  .catch((err) => {
    console.log('Database Connection Failed');
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
