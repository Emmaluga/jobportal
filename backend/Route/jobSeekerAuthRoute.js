const express = require('express')
const {registerCtrl, loginCtrl, userProfileCtrl,
 forgotPasswordCtrl, deleteUserCtrl } = require('../controller/authJobSeekerController')

const { jobseekerauth } = require('../middleware/jobSeekerAuthMiddleware')
const {validationLogic, jobSeekerLoginValidation, JobSeekerRegisterValidation} = require('../middleware/jobSeekerValidation')
const jobSeekerAuthRoute = express.Router()


jobSeekerAuthRoute.post('/signup', JobSeekerRegisterValidation, validationLogic, registerCtrl)
jobSeekerAuthRoute.post('/signin', jobSeekerLoginValidation, validationLogic, loginCtrl)
jobSeekerAuthRoute.get('/userprofile', jobseekerauth, userProfileCtrl)
jobSeekerAuthRoute.post('/forgotpassword', forgotPasswordCtrl)
jobSeekerAuthRoute.put('/resetpassword/:resettoken', forgotPasswordCtrl)
jobSeekerAuthRoute.get('/signoutuser', deleteUserCtrl)

module.exports = jobSeekerAuthRoute 