const  mongoose  = require("mongoose");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

    const userModel = new mongoose.Schema({

        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: Number,
             default: 0
        }

    }, {timestamps: true})

    //save password before hashing

 userModel.pre("save", async function(next) {

     if(!this.isModified("password")){

        next()
    }
    
    this.password = await bcrypt.hash(this.password, 10)
     
 })

 userModel.methods.comparePassword = async function(enterapassword){

    return await bcrypt.compare(enterapassword, this.password)

 }

 userModel.methods.jwtToken = async function(){
    return jwt.sign({id: this.id}, process.env.SECRETKEY, {expiresIn: 3600 })
 }
 
 
 
 
 module.exports = mongoose.model("User", userModel)