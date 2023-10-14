const expressAsyncHandler = require("express-async-handler");
const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");


const RegisterController = expressAsyncHandler ( async (req,res)=> {

   res.status(200).send("hello application")

    const {email} = req.body

    const userExist = await userModel.findOne({email})
     if(userExist){
        res.status(500)
     throw new Error("email already exist")
     }

 

     const newUser = await userModel.create(req.body)
          if(!newUser){
            res.status(500)
            throw new Error("invalidate user")
          }

     res.json( newUser )

})

// exports.loginUser = expressAsyncHandler ( async (req,res) => {

//      const {email, password} = req.body

//         if(!email){
//           res.status(500)
//           throw new Error("add email please ")
//         }

//         if(!password){
//             res.status(500)
//             throw new Error("please add a password")
//           }

//           const user = await user.comparePassword(password)
//             if(!user){
//              res.status("password does not match")
//             }

//               sendTokenResponse(user, 200, res )

// })

// exports.userProfile = async (_req, _res, _next ) => {
  
//    const {_id} = await userModel.findById( request.createdUser.id)

//    response.json({
//       id: _id
//    })
// }

// exports.logout = async (_req, res, next )=> {
//       res.clearCookie("token")
//       res.json({
//         success: true,
//         message: "logged out"
//       })

//       next()
// }




// const sendTokenResponse =  async (user, statusCode, res)=> {

//     const storeToken = await user.jwtToken()
//     res.statusCode(statusCode)
//     res.cookie("token", storeToken, {maxAge: 60 * 60* 1000, httpsonly: true})
  

//     res.json(user, storeToken )

// }

module.exports = {
  
   RegisterController
}

