const express = require('express')
const { updateEmployUsersCtrl, singleEmployUsersCtrl,
     allEmployerUsersCtrl, deleteEmployUsersCtrl, jobHistoryCtl } = require('../controller/employerUserCrl')
const {employerAuth } = require('../middleware/employerAuthMiddleware')
const employerUserRoute = express.Router()


employerUserRoute.get('/all/employerusers/', employerAuth, allEmployerUsersCtrl)
employerUserRoute.get('/single/employerusers/:id', employerAuth, singleEmployUsersCtrl )
employerUserRoute.put('/update/employerusers/:id', employerAuth, updateEmployUsersCtrl)
employerUserRoute.delete('/delete/employerusers/:id', employerAuth, deleteEmployUsersCtrl)
employerUserRoute.post('/jobhistory/employerusers', employerAuth, jobHistoryCtl)


module.exports = employerUserRoute