const PayConnectController = require('../controllers/vtu.controller')
const auth = require('../middlewares/auth')
const { ROUTE_PAYCONNECT_GET_NETWORK } = require('../util/page-route')

const router = require('express').Router()

router.get(ROUTE_PAYCONNECT_GET_NETWORK, (req, res)=>{
// router.get(ROUTE_PAYCONNECT_GET_NETWORK, [auth], (req, res)=>{
    const payConnectController = new PayConnectController()
    return payConnectController.getNetwork(req, res)
})


module.exports = router