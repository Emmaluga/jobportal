const employerAuthModel = require('../model/employerAuthModel')
const jwt = require('jsonwebtoken')

const employerAuth = async (req,res,next)=> {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      token = req.headers.authorization.split(" ")[1]
    }

    if(!token){
       res.status(500)
       throw new Error('no token pls provide token')
    }

      try {
        const decoded = await jwt.verify(token, process.env.SECRETKEY)
        req.employUsers = await employerAuthModel.findById(decoded.id).select('-password')
    
        next()  

      } catch (error) {
        res.status(500)
        throw new Error('wrong token not authorized')
      }


}

const AdminAuth = (req,res,next)=> {
   if(req.employUsers.role === 'employer'){
    res.status(500)
    throw new Error('wrong token not authorized')
   }

   next()
}

module.exports = {
    employerAuth,
    AdminAuth
}