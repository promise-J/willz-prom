const UserController = require('../controllers/user.controller')
const auth = require('../middlewares/auth')
const { ROUTE_REGISTER, ROUTE_LOGIN, ROUTE_VERIFY_EMAIL, ROUTE_GOOGLE_AUTH, ROUTE_GET_ACCOUNT, ROUTE_REGISTER_USER, ROUTE_FUND_ACCOUNT } = require('../util/page-route')

const router = require('express').Router()

router.post(ROUTE_REGISTER, (req, res)=>{
    const userController = new UserController()
    return userController.createUser(req, res)
})
router.post(ROUTE_LOGIN, (req, res)=>{
    const userController = new UserController()
    return userController.loginUser(req, res)
})
router.post(ROUTE_VERIFY_EMAIL, (req, res)=>{
    const userController = new UserController()
    return userController.verifyEmail(req, res)
})
router.post(ROUTE_GOOGLE_AUTH, (req, res)=>{
    const userController = new UserController()
    return userController.googleAuthEmail(req, res)
})
router.get(ROUTE_GET_ACCOUNT, [auth], (req, res)=>{
    const userController = new UserController()
    return userController.getUser(req, res)
})
router.put(ROUTE_FUND_ACCOUNT, [auth], (req, res)=>{
    const userController = new UserController()
    return userController.fundAccount(req, res)
})
router.post(ROUTE_REGISTER_USER, (req, res)=>{
    const userController = new UserController()
    return userController.registerUser(req, res)
})

module.exports = router