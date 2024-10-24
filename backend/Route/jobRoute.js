const express = require('express')
const { createJobsCtrl, singleJobCtrl,allJobsCtrl, updateJobsCtrl, deleteJobsCtrl} = require('../controller/jobController')
const { employerAuth } = require('../middleware/employerAuthMiddleware')
const jobRoute = express.Router()


jobRoute.post('/create/jobs', employerAuth, createJobsCtrl )
jobRoute.get('/show/jobs',  allJobsCtrl )
jobRoute.get('/singlejob/:id', employerAuth, singleJobCtrl )
jobRoute.put('/updatejob/:id', employerAuth, updateJobsCtrl )
jobRoute.delete('/deletejob/:id', employerAuth, deleteJobsCtrl )

module.exports = jobRoute 