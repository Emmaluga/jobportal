const notFound = async (req,res,next)=> {

    res.status(404)
    res.send('page not found ')

    next()
}


module.exports = notFound