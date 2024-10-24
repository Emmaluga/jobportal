const asyncHandler = require('express-async-handler')
const job = require('../model/jobModel')
const employerModel = require('../model/employerAuthModel')
const searchJobs = require('../utilities/searchFuncUtilities')


const createJobsCtrl = asyncHandler ( async (req,res)=> {
    const { jobTittle, company, jobCategory, jobFunction, workingHours,
remoteOption, industry, location, skills, description, responsibilities,
qualifications, applyMethod, appluUrl, applicationDeadLine,
positionDate , experience , status, jobType  } = req.body

const employerJobsId = await employerModel.findOne({_id: req.employUsers.id})
const checkJobs = await job.findOne({}, {_id:1})
     if(checkJobs){
        res.status(500)
        throw new Error('job exist, pls create new job')
     }

     const newJobs = await job.create({
        jobTittle, company, jobCategory, jobFunction, workingHours,
        remoteOption, industry, location, skills, description, responsibilities,
        qualifications, applyMethod, appluUrl, applicationDeadLine,
        positionDate , experience, status, jobType,
        Employer: req.employUsers.id
     })
     //create multiple job id
     employerJobsId.Job.push(newJobs._id)
     await employerJobsId.save()
     

     res.status(200)
     res.json({message: 'job created successfully', newJobs})

     if(!newJobs){
      res.status(500)
      throw new Error('invalide jobs')
     }
})

const allJobsCtrl = asyncHandler ( async (req,res)=> {
    const quary = req.query.q || "" 
    const page = parseInt(req.query.page || 0 )
    const limitPage = parseInt(req.query.limitPage || 5 )

    const filters = {
       
        location: req.query.location,
        jobCategory:req.query.jobCategory,
        // jobFunction:req.query.jobFunction,
        // industry:req.query.industry,
        // jobType:req.query.jobType,
        // remoteOption:req.query.remoteOption,
        // minSalary:req.query.minSalary,
        // maxSalary:req.query.maxSalary,
        // minExp:req.query.minExp,
        // maxExp:req.query.maxExp,
        // skills:req.query.skills ? req.query.skills.split(" ") : []
    }

    const searchCritaria = {}
    //text search
    if(quary){
     searchCritaria.$text = {$search:quary}
    }

    //appy filters
    if(filters.location) searchCritaria['location.city'] = {$regex: filters.location, $options: "i"}

    if(filters.jobCategory) searchCritaria.jobCategory = {$regex: filters.jobCategory, $options: "i"}


  //execute search 
    const showJobs = await job.find(searchCritaria).skip(page * limitPage)
    // const count = await job.find(searchCritaria).countDocuments()
    const count = await job.countDocuments(searchCritaria)

    if(showJobs){
      res.status(200)
      res.json({message: 'jobs displayed successfully',
         showJobs,
        page,
        pages: Math.ceil(count / limitPage),
        count
    })
    }else{
        res.status(500)
        throw new Error('cant display all jobs')
    }

})

const singleJobCtrl = asyncHandler ( async (req,res)=> {
    const singleJob = await job.findById(req.params.id)
    if(singleJob){
      res.status(200)
      res.json({message: 'single job displayed successfully', singleJob})
    }else{
        res.status(500)
        throw new Error('cant display single job')
    }

})

const updateJobsCtrl = asyncHandler ( async (req,res)=> {
    const updateJob = await job.findByIdAndUpdate(req.params.id, req.body,{new:true})
    .populate('Employer', 'companyAdmin.firstName')
    
    if(updateJob){
      res.status(200)
      res.json({message: 'job updated successfully', updateJob})
    }else{
        res.status(500)
        throw new Error('cant update job')
    }

    
})


const  deleteJobsCtrl  = asyncHandler ( async (req,res)=> {
    const deleteJob = await job.findByIdAndDelete(req.params.id)
    if(deleteJob){
      res.status(200)
      res.json({message: 'jobs deleted successfully', deleteJob})
    }else{
        res.status(500)
        throw new Error('cant delete job')
    }

    
})


module.exports = {

    createJobsCtrl,
    allJobsCtrl,
    singleJobCtrl,
    updateJobsCtrl,
    deleteJobsCtrl 
}

