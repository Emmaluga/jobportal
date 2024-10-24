const jwt =  require('jsonwebtoken') 
const asyncHandler = require('express-async-handler')


const sendTokenfunc =  async (user, res)=> {
    const storeToken = await token(user.id)
    res.cookie('token', storeToken, {maxAge: 60*60*1000, secure:true, httponly:true  })
}


const token = async (id)=> {
    return  jwt.sign({id},process.env.SECRETKEY,{expiresIn: 60*60*1000})

}

module.exports = {
    sendTokenfunc 

}