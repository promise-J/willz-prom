const UserController = require('../controllers/user.controller')
const { ROUTE_REGISTER } = require('../util/page-route')

const router = require('express').Router()

router.post(ROUTE_REGISTER, (req, res)=>{
    const userController = new UserController()
    return userController.createUser(req, res)
})

module.exports = router