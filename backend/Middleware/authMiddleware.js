
const  jwt =  require("jsonwebtoken")
const userModel = require("../Model/userModel")

const protectedRoute = async (req, res, next ) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

         try {
            
            token = req.headers.authorization.split(" ")[1]
      
            const decoded = jwt.verify( token, process.env.SECRETKEY )
      
             req.createdUser = await userModel.findById(decoded.id).select("-password")

             next()

         } catch (error) {

            console.log(error)

            res.status(500)
            throw new Error("No validation, no token")
            
         }

         if(!token){

            res.status(500)
            throw new Error("No token")

         }


    }else{
      res.status(500)
      throw new Error("Not working completly")
    }    

}

const adminAuth = ( req, res, next )=> {

    if(  req.createdUser.role === 0 ){

       res.status(500)
       throw new Error("you must be an admin ")

    }

    next()

}


module.export =  { 
   protectedRoute,
   adminAuth

}







     


