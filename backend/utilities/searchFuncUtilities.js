const job = require('../model/jobModel')

// search job
const searchJobs = async (quary, filters)=> {
    const {
  
      location,
      jobCategory,
      jobFunction,
      industry,
      jobType,
      remoteOption,
      minSalary,
      maxSalary,
      minExp,
      maxExp,
      skills,
      ...rest
  
  
    } = filters
  
    const searchQuary = {
      $text: {$search: quary },
      ...rest
    };
  
    if(location){
      searchQuary['location.city'] = {$regex: location, $options: 'i'}
    }
  
    if(jobCategory){
      searchQuary.jobCategory = jobCategory
  
    }
  
    if(jobFunction){
      searchQuary.jobFunction = jobFunction
  
    }
  
    if(industry){
      searchQuary.industry = industry
  
    }
  
    if(remoteOption){
      searchQuary.remoteOption = remoteOption
  
    }
  
    if(minSalary && maxSalary){
      searchQuary['salary.min'] = {$gte: minSalary}
      searchQuary['salary.max'] = {$lte: maxSalary}
    }else if(minSalary){
     searchQuary['salary.min'] = {$gte: minSalary}
    } else if(maxSalary){
      searchQuary['salary.max'] = {$lte: maxSalary}
    }
  
  
    if(minExp && maxExp){
   searchQuary['experirnce.minYears']= {$gte: minExp}
   searchQuary['experirnce.maxYears']= {$lte: maxExp}
    }else if(minExp){
      searchQuary['experirnce.minYears']= {$gte: minExp}
    }else if (maxExp){
    searchQuary['experirnce.maxYears']= {$lte: maxExp}
  
    }
  
    if(skills.length > 0 ){
      searchQuary.skills = {$in: skills}
    }
  
    const jobs = await job.find(searchQuary)
      return jobs
 }

   module.exports = searchJobs

