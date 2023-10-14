const express = require("express")
const { RegisterController, loginUser, logout, userProfile } = require("../Controller/authController")
const authRoute = express.Router()

userRoute.post("/register", RegisterController)
// userRoute.post("/login", loginUser)
// userRoute.post("/me",  userProfile)
// userRoute.post("/logout", logout)



module.exports = authRoute