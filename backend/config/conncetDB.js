const mongoose = require('mongoose')


const connectDB  = async (url)=> {
   await mongoose.connect(url)
}

mongoose.set( "strictQuery" , false )

module.exports = connectDB
