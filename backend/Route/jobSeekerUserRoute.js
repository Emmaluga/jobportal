const express = require('express')
const {alljobSeekerUsersCtrl, singleJobSeekerUsersCtrl,
     updateJobSeekerUsersCtrl, deleteJobSeekerUsersCtrl } = require('../controller/jobSeekerUsercrl')
 const { jobseekerauth } = require('../middleware/jobSeekerAuthMiddleware')
 const jobSeekerUserRoute = express.Router()


jobSeekerUserRoute.get('/all/jobseekerusers', jobseekerauth, alljobSeekerUsersCtrl )
jobSeekerUserRoute.get('/single/jobseekerusers/:id', jobseekerauth, singleJobSeekerUsersCtrl)
jobSeekerUserRoute.patch('/update/jobseekerusers/:id', jobseekerauth, updateJobSeekerUsersCtrl )
jobSeekerUserRoute.delete('/delete/jobseekerusers/:id', jobseekerauth, deleteJobSeekerUsersCtrl )


module.exports = jobSeekerUserRoute 