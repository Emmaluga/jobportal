require("dotenv").config()
const express = require("express")
const connectDB = require("./Config/connectDB")
const cors = require("cors")
const notFound = require("./Middleware/routeMiddleware")
const errHandler = require("./Middleware/errMiddleware")
const authRoute = require("./Model/userModel")
const cookieparser = require("cookie-parser")
const app = express()
// connectDB()



//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieparser())

//routes
app.use("/api", authRoute)




//middleware
app.use(errHandler)
app.use("*", notFound)



const port = process.env.port || 8000

const start = ()=> {
    try {
        connectDB(process.env. MONGODBURL)
        console.log("connected")
    } catch (error) {
        console.log("failed")
        
    }
}

app.listen(port, ()=> console.log(`server running on port ${port}`))


start()


