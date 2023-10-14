
const asyncHandler = require("express-async-handler")
const userModel = require("../Model/userModel")
const expressAsyncHandler = require("express-async-handler")


const allUsersController  =  asyncHandler ( async (req, res )=> {

     const getAllUsers = await userModel.find()

     if( !getAllUsers){
        res.status(500)
        throw new Error("users cant be found")

     }else{
        res.json(getAllUsers)
     }
    
})

const singleUsersController = asyncHandler ( async (req, res, ) => {

     const getSingleUser = await userModel.findById(req.params.id)

      if(!getSingleUser){
          res.status(500)
          throw new Error("user does not exist")
      }else{
         res.json(getSingleUser)
      }
})


const updateSingleUserController = asyncHandler (async (req,res)=> {

   const updateSingleUser = await userModel.findByIdAndUpdate(req.params.id)
    if(!updateSingleUser){
        res.status(500)
        throw new Error("Cannot update single user")
    }else{
        res.json(updateSingleUser)
    }
})

const deleteSingleUserController = asyncHandler ( async (req,res)=> {

    const deleteSingleUser = await userModel.findByIdAndDelete(req.params.id) 

    if(!deleteSingleUser){
        res.status(500)
        throw new Error("Cannot delete single user")
    }else{
        res.json(deleteSingleUser)
    }

})

module.exports = {

    allUsersController,
    singleUsersController,
    updateSingleUserController,
    deleteSingleUserController
}