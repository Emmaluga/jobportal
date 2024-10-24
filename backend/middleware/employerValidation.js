const {check, validationResult} = require('express-validator')


const employerRegisterValidation = [

    check("companyName")
    .notEmpty()
    .withMessage('companyName is required'),


    check("companyAddress")
    .notEmpty()
    .withMessage('companyAddress is required'),

    check("industry")
    .notEmpty()
    .withMessage('industry is required'),

    check("country")
    .notEmpty()
    .withMessage('country is required'),


    check("city")
    .notEmpty()
    .withMessage('city is required'),

    check("state")
    .notEmpty()
    .withMessage('state is required'),


    check("companyDescription")
    .notEmpty()
    .withMessage('company discription is required'),

    check("email")
    .isEmail()
    .withMessage('email is required'),

    check('password')
    .isStrongPassword()
    .withMessage('at least one uppercase,lowercase,number and symbol is required'),

    check("companyAdmin")
    .notEmpty() 
    .withMessage('companyAdmin is required'),


    // check("firstName")
    // .notEmpty()
    // .withMessage('firstName is required'),

    // check("lastName")
    // .notEmpty()
    // .withMessage('lastName is required'),

    // check("phoneNumber")
    // .notEmpty()
    // .withMessage('phoneNumber is required'),

    // check("position")
    // .notEmpty()
    // .withMessage('position is required'),

   
]



const employerLoginValidation = [

    check('email')
    .isEmail()
    .withMessage('email is required'),

    check('password')
    .isStrongPassword()
    .withMessage('password is required')

]

const employerValLogic = async (req,res,next)=> {
    const errors = validationResult(req)
    if(errors.array().length > 0 ){
      res.status(400).json({error: errors})
    }

    next()
}

module.exports = {employerLoginValidation, employerRegisterValidation, employerValLogic}