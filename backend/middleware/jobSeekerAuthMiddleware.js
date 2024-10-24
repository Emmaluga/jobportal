const jwt = require('jsonwebtoken')
const jobseekerModel = require('../model/jobSeekerAuthModel')


const jobseekerauth = async (req,res,next)=> {
     
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        res.status(500)
        throw new Error('no token, pls provide token')
 
    }
 
    try {
      const decoded = await jwt.verify(token,process.env.SECRETKEY) 
      req.createdUsers = await jobseekerModel.findById(decoded.id).select('-password') 
      
    } catch (error) {
        res.status(500)
        throw new Error('no authorization, wrong token')
    }
 
    next()
  }

  const AdminAuth = async (req,res,next)=> {
     if(req.createdUsers.role === 'user'){
      res.status(500)
      throw new Error('you must be an admin to access this info')

     }

     next()
  }

  module.exports = {
    jobseekerauth,
    AdminAuth
  }