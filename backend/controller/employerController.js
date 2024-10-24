const asyncHandler = require('express-async-handler')
const employerModel = require('../model/employerAuthModel')
const { sendTokenfunc } = require('../utilities/tokenUtilities')
const { sendMailFunc } = require('../utilities/sendMail')
const crypto = require('crypto')



const employerRegisterCrl = asyncHandler ( async (req,res)=> {
   const {email, password, companyAddress, industry ,
       companyName, companyAdmin, country, city, state,
      zipCode, website, companyDescription, } = req.body

const checkEmployer = await employerModel.findOne({email})
       if(checkEmployer){
         res.status(500)
         throw new Error('info exist pls register')
       }

const employerUser = await employerModel.create({
  email, password, companyAddress, companyName, 
  companyAdmin, country, city, state, zipCode,
  website, companyDescription, industry


})
       if(!employerUser){
         res.status(500)
         throw new Error('invalidate credentials')

       }else{

         res.status(200)
         res.json({message: "company registered successfully", employerUser})
       }

})

const employerLoginCrl = asyncHandler ( async (req,res)=> {
   const {email, password } = req.body
    const checkDetail = await employerModel.findOne({email})

     if(checkDetail && (await checkDetail.comparePassword(password)) ){
       const token = await sendTokenfunc(checkDetail, res)
       res.status(200)
       res.json({message: `logged in successfully ${checkDetail.companyAdmin.firstName}`, token })
    }else{

      res.status(500)
      throw new Error('email or password does not match')
    }  

})


const employerUserProfileCrl = asyncHandler (async (req,res)=> {
   const { companyAdmin } =  await employerModel.findById(req.employUsers.id)
   res.status(200)
   res.json({message: `welcome to your dashboard ${companyAdmin.firstName}`})
})

const forotPassCtrl = asyncHandler (async (req,res)=> {
  const {email} = req.body
  const user = await employerModel.findOne({email})

  if(!user){
   res.status(500)
   throw new Error('info exist pls register ok ')
  }
  //store token
   const token = await user.GenFgtPasstokenFunc()

   //create url 
   const url = `http://localhost:3000/resetPassword${token}`

   //message
   const message = `
     <h1>Password reset request </h1>
     <p>Please click the link below to reset your password</p>
      <a href=${url} clicktracking=off>${url}</a>
     <p>Please ignore this message if you did not request a reset password</p>

   ` 

    const sendingMessage = await sendMailFunc({
      to: user.email,
      message: 'Password Reset Token',
      html: message

    })

       res.status(201)
       res.json({message: 'email sent'})


       if(!sendingMessage){

      user.forgotpasswordtoken = undefined,
      user.fogotpassworddateexpires = undefined,
  
       await user.save()
  
      res.status(500)
      throw new Error(' email not sent ')

          }
    

})

const resetPassCtrl = asyncHandler (async (req,res)=> {
  //recreate hash token 
  const forgotpasswordtoken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex')
  //

  const user = await employerModel.findOne({

      forgotpasswordtoken,
      fogotpassworddateexpires: {$gt: Date.now()}
  })

     //reset password
    user.password = req.body.password,
    user.forgotpasswordtoken = undefined,
    user.fogotpassworddateexpires = undefined

     await user.save()
    
     res.status(201)
     res.json({message: 'password reset'})

     if(!user){
      res.status(500)
      throw new Error('invalid token')
     }
     

})



const logoutEmployerCrl = asyncHandler ( async(req,res)=> {
   res.clearCookie('token')
   res.status(201)
   res.json({message: 'logged out successfully'})
})




module.exports = {
  employerRegisterCrl,
  employerLoginCrl,
  logoutEmployerCrl,
  employerUserProfileCrl,
  forotPassCtrl,
  resetPassCtrl

}


