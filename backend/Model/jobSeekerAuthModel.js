const  mongoose  = require("mongoose");
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
 const crypto = require('crypto')

    const userSchema = new mongoose.Schema({
 
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    role:{
        type: String,
        enum: ['admin','user'],
         default: "user"
    },

  

    password: {
        type: String,
        required: true
    },
    
    forgotpasswordtoken: String,
    fogotpassworddateexpires: Date,

   
}, {timestamps: true})

//save password before hashing

userSchema.pre("save", async function(next) {

 if(!this.isModified("password")){

    next()
}

this.password = await bcryptjs.hash(this.password, 10)
 
})

userSchema.methods.comparePassword = async function (enterApassword){
   return bcryptjs.compare(enterApassword, this.password)
}

userSchema.methods.fgtpasToken = async function(){
  const token = crypto.randomBytes(20).toString('hex')

this.forgotpasswordtoken = crypto.createHash('sha256').update(token).digest('hex')
  
this.fogotpassworddateexpires = Date.now() + 10 * (10 * 1000 )

 return token

}


 module.exports = mongoose.model('jobSeekers', userSchema)