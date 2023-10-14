const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema

const jobCategorySchema =  new mongoose.Schema({

    jobCategoryName: {

        type: String,
        required: true

    },

     user: {
        type: ObjectId,
        ref: "User",
        required: true

     }
})

module.exports = mongoose.model("Jobcategory", jobCategorySchema)