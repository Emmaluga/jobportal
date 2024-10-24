const asyncHandler = require('express-async-handler')
const userModel = require('../model/jobSeekerAuthModel')



const alljobSeekerUsersCtrl = asyncHandler (async (req,res)=> {

    const page = req.query.pageNumber || 0
    const pageSize = 5
    const count = await userModel.find().countDocuments()

   const alljobseekers = await userModel.find().limit(pageSize).skip(page * pageSize)
    if(alljobseekers){
      res.status(201)
      res.json({
        alljobseekers,
        page,
        pages: Math.ceil(count / pageSize),
        count

    })
    }else{
        res.status(500)
        throw new Error('invalidate users')
    }
})

const singleJobSeekerUsersCtrl = asyncHandler (async (req,res)=> {
    const singleJobSeeker = await userModel.findById(req.params.id)
    if(singleJobSeeker){
       res.status(201)
       res.json(singleJobSeeker)

    }else{
        res.status(500)
        throw new Error('invalidate single users')
    }
})

const updateJobSeekerUsersCtrl = asyncHandler (async (req,res)=> {
    const updateJobSeeker = await userModel.
    findByIdAndUpdate(req.params.id, req.body, {new: true})
    
    if(updateJobSeeker){
       res.status(201)
       res.json({message: 'updated successfully', updateJobSeeker})

    }else{
        res.status(500)
        throw new Error('invalidate update users')
    }
})

const deleteJobSeekerUsersCtrl = asyncHandler (async (req,res)=> {
    const deleteJobSeeker = await userModel.
    findByIdAndDelete(req.params.id, req.body, {new: true})
    
    if(deleteJobSeeker){
       res.status(201)
       res.json({message: ' deleted successfully', deleteJobSeeker})

    }else{
        res.status(500)
        throw new Error('invalidate update users')
    }
})





module.exports = {
  alljobSeekerUsersCtrl,
  singleJobSeekerUsersCtrl,
  updateJobSeekerUsersCtrl,
  deleteJobSeekerUsersCtrl
}