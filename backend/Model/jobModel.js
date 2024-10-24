const mongoose = require('mongoose')


const jobModel = new mongoose.Schema({

   jobTittle: {
    type: String,
    required: true,
    trim: true,
    text: true

  },


  company: {
   Name: {
        type: String,
        required: true,
        trim: true
    },

    Website: {
        type: String,
        trim: true
    },

    companySize: {
        type: String,
        trim: true,
        enum: ['1-10', '11-50', '51-200', '201-500']
    },

    companyType: {
        type: String,
        enum: ['public', 'private', 'government'],
        trim: true

    },

    companylogo: {
        type: String,
      
    }
   
},


jobType: {
  type: String,
  enum: ['full-time', 'part-time', 'contract', 'temporary', 'internship', 'freelance'],
  trim: true,
  required: true

},


jobCategory: {
  type: String,
  required: true,
  trim: true
},

industry: {
  type: String,
  required: true,
  trim: true
},

experience: {
  minYears: {
    type: String,
    required: true,
    default: "0"

  },
  maxYears: {
    type: String,
    required: true,
    default: Infinity
  
  }
},

salary: {
  currency: {
    type: String,
    default: 'USD',
    trim: true
  },

  min: {

    type: String,
    trim: true
   

  },

  max: {
    type: String,
    trim: true
  }
},

location: {
  country: {
    type: String,
    required: true,
    trim: true
  },

  state: {
    type: String,
    required: true,
    trim: true
  },

  city: {
    type: String,
    required: true,
    trim: true
  },

  zipCode: {
    type: String,
    trim: true
  }
},

workingHours: {
  type: String,
  trim: true,
  enum: ['full-time', 'part-time', 'flexible']
},

remoteOption: {
  type: String,
  required: true,
  enum: ['remote', 'on-site', 'hybrid']
},

description: {
  type: String,
  required: true,
  trim: true
},

responsibilities: [{
  type: String,
  trim: true
}],

qualifications: [{
  type: String,
    trim: true
}],

skills: [{
  type: String,
    trim: true
}],

status: {
  type: String,
   default: "Active",
   enum: ['Active', 'Inactive', 'Closed']

},

applyMethod: {
  type: String,
  required: true,
  trim: true,
  enum: ['quickApply', 'url' ]

},

applyUrl: {
  type: String,
  trim: true,
},

isFeatured: {
  type: Boolean,
  default: false,

},

applicationDeadLine: {
  type: Date,
  
},

positionDate:{
  type: Date,
  default: Date.now
},

// slug: {
//   type: String,
//   unique: true,
//   slug: 'tittle'
// },

Employer: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Employer'
}



},{timestamps: true})

jobModel.index({
  jobTittle: 'text',
  company: 'text',
  jobCategory: 'text',
  jobFunction: 'text',
  industry: 'text',
  location: 'text',
  skills: 'text'

})

 const job = mongoose.model('Job', jobModel)

// module.exports = mongoose.model('Job', jobModel)

// // search job
// const searchJobs = async (quary, filters)=> {
//   const {

//     location,
//     jobCategory,
//     jobFunction,
//     industry,
//     jobType,
//     remoteOption,
//     minSalary,
//     maxSalary,
//     minExp,
//     maxExp,
//     skills,
//     ...rest


//   } = filters

//   const searchQuary = {
//     $text: {$search: quary },
//     ...rest
//   };

//   if(location){
//     searchQuary['location.city'] = {$regex: location, $options: 'i'}
//   }

//   if(jobCategory){
//     searchQuary.jobCategory = jobCategory

//   }

//   if(jobFunction){
//     searchQuary.jobFunction = jobFunction

//   }

//   if(industry){
//     searchQuary.industry = industry

//   }

//   if(remoteOption){
//     searchQuary.remoteOption = remoteOption

//   }

//   if(minSalary && maxSalary){
//     searchQuary['salary.min'] = {$gte: minSalary}
//     searchQuary['salary.max'] = {$lte: maxSalary}
//   }else if(minSalary){
//    searchQuary['salary.min'] = {$gte: minSalary}
//   } else if(maxSalary){
//     searchQuary['salary.max'] = {$lte: maxSalary}
//   }


//   if(minExp && maxExp){
//  searchQuary['experirnce.minYears']= {$gte: minExp}
//  searchQuary['experirnce.maxYears']= {$lte: maxExp}
//   }else if(minExp){
//     searchQuary['experirnce.minYears']= {$gte: minExp}
//   }else if (maxExp){
//   searchQuary['experirnce.maxYears']= {$lte: maxExp}

//   }

//   if(skills.length > 0 ){
//     searchQuary.skills = {$in: skills}
//   }

//   const jobss = await job.find(searchQuary)
//     return jobss
// }

 module.exports = job
//  exports.job = job
// exports.searchJobs = searchJobs




