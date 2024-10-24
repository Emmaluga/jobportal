const  mongoose  = require("mongoose");
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const crypto = require('crypto')

const jobHistoryModel = new mongoose.Schema({

    jobTittle: {
     type: String,
    //  required: true,
     trim: true,
     text: true
 
   },
 
 
   company: {
    Name: {
         type: String,
        //  required: true,
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
  //  required: true
 
 },
 
 
 jobCategory: {
   type: String,
  //  required: true,
   trim: true
 },
 
 industry: {
   type: String,
  //  required: true,
   trim: true
 },
 
 experience: {
   minYears: {
     type: String,
    //  required: true,
     default: "0"
 
   },
   maxYears: {
     type: String,
    //  required: true,
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
    //  required: true,
     trim: true
   },
 
   state: {
     type: String,
    //  required: true,
     trim: true
   },
 
   city: {
     type: String,
    //  required: true,
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
  //  required: true,
   enum: ['remote', 'on-site', 'hybrid']
 },
 
 description: {
   type: String,
  //  required: true,
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
  //  required: true,
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



})
 
// 
// 

    const employSchema = new mongoose.Schema({
 
    companyName: {
        type: String,
        required: true
    },

    companyAddress: {
        type: String,
        required: true
    },
     
    city: {
        type: String,
        required: true
        
    },
    state: {
        type: String,
        required: true
       
    },

    country: {
        type: String,
        required: true
       
    },

    zipCode: {
        type: String,
  
       
    },

    website: {
        type: String, 
    },

    logo: {
        type: String,
    },

    industry: [{
        type: String,
        required: true
       
    }],

    companyDescription: {
        type: String,
        required: true
       
    },

    companyAdmin: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },

        linkedInPage: {
            type: String,
          
        }
       
    },


    email:{
        type: String,
        required: true,
        unique: true
    },
   
    
    role:{
        type: String,
        enum: ['admin','employer'],
         default: "employer"
    },

    jobHistory: [jobHistoryModel],
   
    Job: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true,
    }],

    password: {
        type: String,
        required: true
    },
    
    forgotpasswordtoken: String,
    fogotpassworddateexpires: Date,

   
}, {timestamps: true})

//save password before hashing

employSchema.pre("save", async function(next) {

 if(!this.isModified("password")){

    next()
}

this.password = await bcryptjs.hash(this.password, 10)
 
})

// employSchema.methods.comparePassword = async function (enterApassword){
//    return bcryptjs.compare(enterApassword, this.password)
// }

employSchema.methods.comparePassword = async function(enterApassword){
   return this.password = await bcryptjs.compare(enterApassword, this.password)
}


//create and hash token
 employSchema.methods.GenFgtPasstokenFunc = async function(){

 const token = crypto.randomBytes(20).toString('hex')
    //hash password
forgotpasswordtoken = crypto.createHash('sha256').update(token).digest('hex')
    
fogotpassworddateexpires = Date.now() + 10 * ( 10 * 1000 )

    return token 
 }



 module.exports = mongoose.model('Employer', employSchema)