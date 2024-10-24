const asyncHandler = require('express-async-handler')
const userModel = require('../model/jobSeekerAuthModel')
const { sendTokenfunc } = require('../utilities/tokenUtilities')
const { sendMailFunc } = require('../utilities/sendMail')
const crypto = require('crypto')



const registerCtrl = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body
  const existUser = await userModel.findOne({ email })
  if (existUser) {
    res.status(500)
    throw new Error('info exist, pls register')
  }

  const newUsers = await userModel.create({
    firstName, lastName, email, password, role
  })

  if (!newUsers) {
    res.status(500)
    throw new Error("invalidate user")
  }

  res.status(200)
  res.json({ message: 'registered successuflly ' })

})

const loginCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const checkUser = await userModel.findOne({ email })

  if (checkUser && (await checkUser.comparePassword(password))) {
    const token = await sendTokenfunc(checkUser, res)
    res.status(200)
    res.json({ message: `logged in successfully ${checkUser.firstName}`, token })
  }
  else {

    res.status(500)
    throw new Error('password or email does not match')

  }

})

const userProfileCtrl = asyncHandler(async (req, res) => {
  const { firstName } = await userModel.findById(req.createdUsers.id)

  res.status(201)
  res.json({ message: `welcome to your dashbard ${firstName}` })
})

const forgotPasswordCtrl = asyncHandler(async (req, res) => {
  const { email } = req.body
  const user = await userModel.findOne({email})
  if(!user){
    res.status(500)
    throw new Error('info does not exist pls register')
  }

  //token
  const fgtpassToken = await user.fgtpasToken()

  //create url 
  const url = `http://localhost:3000/forgotpassword/${fgtpassToken}`

  //message
  const message = 
    `
  <2>You requested a password reset</2>
  <p>Please click the link below to reset your password</p>
 <a href=${url} clicktracking=off>${url}</a>
   <p>Please ignore this message if you did not request a reset password</p>

    `
  
 const sendingmail = await sendMailFunc({
    to: user.email,
    subject: 'password reset',
    html: message

 })

 res.status(200)
 res.json({message: 'email sent successfully'})

 if(!sendingmail){
  res.status(500)
  throw new Error('email not sent ')
}

})


const resetPasswordCtrl = asyncHandler(async (req, res) => {
  //reharsh token
  const passwordRes = crypto.createHash('sha256').update(req.params.resettoken).digest('hex')
     
  //find token and date
  const user = await userModel.findOne({
    passwordResetToken,
    fogotpassworddateexpires: { $gt: Date.now() }

  })

  if(!user){
    res.status(400)
    throw new Error('invalid reset token')
  }

   //create new password
  user.password = req.body.password,
  user.passwordResetToken = undefined,
  user.fogotpassworddateexpires = undefined

  await user.save()

  res.status(201)
  res.json({message: 'password reset done.'})

})

const deleteUserCtrl = asyncHandler(async (req, res) => {
  res.clearCookie('token')
  res.status(201)
  res.json({ message: 'logged out successfully' })

})



module.exports = {
  registerCtrl,
  loginCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  forgotPasswordCtrl,
  resetPasswordCtrl

}