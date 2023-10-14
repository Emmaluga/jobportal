 
 const mongoose = require("mongoose")
 const {ObjectId} = mongoose.Schema

 const jobSchema = new mongoose.Schema({

    tittle: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    salary: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    available: {
        type: Boolean,
        default: true
    },

   // link job model to user model using objectid
   

    user: {

        type: ObjectId,
        ref:  "User",
        required: true
    },

    // link jobcategory model to usermodel using objectid
    user: {
        
        type: ObjectId,
        ref:  "Jobcategory",
        required: true
    },


 }, {
    timestamps: true
 })



 module.exports = mongoose.model("Job", jobSchema)