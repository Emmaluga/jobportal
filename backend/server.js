require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookiePerser = require('cookie-parser')
const notFound = require('./middleware/notFoundMiddleware')
const errHandler = require('./middleware/errHandlerMilldleware')
const connectDB = require('./config/conncetDB')
const jobSeekerAuthRoute = require('./route/jobSeekerAuthRoute')
const employerAuthRoute = require('./route/employerRoute')
const jobSeekerUserRoute = require('./route/jobSeekerUserRoute')
const employerUserRoute = require('./route/employUserRoute')
// const jobCatRoute = require('./route/jobCatRoute')
const jobRoute = require('./route/jobRoute')
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({credentials:true, origin: true}))
app.use(cookiePerser())


//route
app.use('/api', jobSeekerAuthRoute)
app.use('/api', employerAuthRoute)
app.use('/api', jobSeekerUserRoute)
app.use('/api', employerUserRoute )
app.use('/api', jobRoute )



//custom middleware
app.use(notFound)
app.use(errHandler)

const port = process.env.port || 5000

const start = async ()=> {
    try {
       connectDB( process.env.MONGODBURL )
        console.log('connected to DB')
        app.listen(port, ()=> console.log(` server running on port ${port}`))
        
    } catch (error) {
  console.log(' failed to connect to DB')
        
    }
}

  start()