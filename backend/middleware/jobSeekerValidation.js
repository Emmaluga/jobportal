const {check, validationResult} = require('express-validator')



const JobSeekerRegisterValidation = [

    check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),

    check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),

    check('email')
    .isEmail()
    .withMessage('email is required'),

    check('password')
    .isStrongPassword()
    .withMessage('at least one uppercase,lowercase,number and symbol is required')


] 

const jobSeekerLoginValidation = [
    
    check('email')
    .isEmail()
    .withMessage('email is required'),

    check('password')
    .isStrongPassword()
    .withMessage('at least one uppercase,lowercase,number and symbol is required')


]


const validationLogic = async (req, res, next )=> {
    const errors = validationResult(req)
     if(errors.array().length > 0 ){
       res.status(400).json({error: errors})
     }
   
     next()
}

module.exports = {validationLogic, jobSeekerLoginValidation, JobSeekerRegisterValidation}

