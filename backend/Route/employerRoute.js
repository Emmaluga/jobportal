const express = require('express')
const { employerRegisterCrl, employerLoginCrl, logoutEmployerCrl, 
   forotPassCtrl, resetPassCtrl, employerUserProfileCrl} = require('../controller/employerController')
const {employerAuth } = require('../middleware/employerAuthMiddleware')
const { employerLoginValidation, employerRegisterValidation, employerValLogic} = require('../middleware/employerValidation')
const { forgotPasswordCtrl } = require('../controller/authJobSeekerController')
const employerAuthRoute = express.Router()


employerAuthRoute.post('/employer/register', employerRegisterValidation, employerValLogic, employerRegisterCrl)
employerAuthRoute.post('/employer/login', employerLoginValidation, employerValLogic, employerLoginCrl)
employerAuthRoute.get('/employer/userprofile', employerAuth, employerUserProfileCrl)
employerAuthRoute.post('/employer/forgotpassword', forotPassCtrl)
employerAuthRoute.put('/employer/resetpassword/:resettoken', resetPassCtrl )
employerAuthRoute.get('/employer/logout', logoutEmployerCrl)

module.exports = employerAuthRoute