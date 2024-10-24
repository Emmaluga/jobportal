const asyncHandler = require('express-async-handler')
const employerModel = require('../model/employerAuthModel')
// const job = require('../model/jobModel')



const allEmployerUsersCtrl = asyncHandler (async (req,res)=> {
const page = req.query.pageNumber || 0
const pageSize = 5
const count = await employerModel.find().countDocuments()

   const allemployer = await employerModel.find()
   .limit(pageSize).skip(page * pageSize)

    if(allemployer){
      res.status(201)
      res.json({
        allemployer,
        page,
        pages: Math.ceil( count / pageSize ),
        count
    })
    }else{
        res.status(500)
        throw new Error('invalidate users')
    }
})

const singleEmployUsersCtrl = asyncHandler (async (req,res)=> {
    const singleEmployer = await employerModel.findById(req.params.id)
    if(singleEmployer){
       res.status(201)
       res.json(singleEmployer)

    }else{
        res.status(500)
        throw new Error('invalidate single users')
    }
})

const updateEmployUsersCtrl = asyncHandler (async (req,res)=> {
    const updateEmploy = await employerModel.
    findByIdAndUpdate(req.params.id, req.body, {new: true})
    
    if(updateEmploy){
       res.status(201)
       res.json({message: 'updated successfully', updateEmploy})

    }else{
        res.status(500)
        throw new Error('invalidate update users')
    }
})

const deleteEmployUsersCtrl = asyncHandler (async (req,res)=> {
    const deleteEmploy = await employerModel.
    findByIdAndDelete(req.params.id, req.body, {new: true})
    
    if(deleteEmploy){
       res.status(201)
       res.json({message: ' deleted successfully', deleteEmploy})

    }else{
        res.status(500)
        throw new Error('invalidate update users')
    }
})

const jobHistoryCtl = asyncHandler (async (req,res)=> {
    const {jobTittle, company, jobCategory, jobFunction, workingHours,
        remoteOption, industry, location, skills, description, responsibilities,
        qualifications, applyMethod, appluUrl, applicationDeadLine,
        positionDate , experience , status, jobType } = req.body
   
        
    const employerUser = await  employerModel.findOne({ _id: req.employUsers.id })
        //job history object

    const jobHistoryObj = {

        jobTittle, company, jobCategory, jobFunction, workingHours,
        remoteOption, industry, location, skills, description, responsibilities,
        qualifications, applyMethod, appluUrl, applicationDeadLine,
        positionDate , experience , status, jobType,
        Employer: req.employUsers.id
    }

    

 //update just history 
 employerUser.jobHistory.push(jobHistoryObj)
 await employerUser.save()

 

 res.status(200)
 res.json({jobHistoryObj})


})





module.exports = {
  allEmployerUsersCtrl,
  singleEmployUsersCtrl,
  updateEmployUsersCtrl,
  deleteEmployUsersCtrl,
  jobHistoryCtl
}