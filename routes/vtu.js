const VTUController = require('../controllers/vtu.controller')
const auth = require('../middlewares/auth')
const { ROUTE_PAYCONNECT_GET_NETWORK, ROUTE_PAYCONNECT_DATA, ROUTE_PAYCONNECT_AIRTIME } = require('../util/page-route')

const router = require('express').Router()

router.get(ROUTE_PAYCONNECT_GET_NETWORK, (req, res)=>{
    const vTUController = new VTUController()
    return vTUController.getNetwork(req, res)
})
router.post(ROUTE_PAYCONNECT_DATA, (req, res)=>{
    const vTUController = new VTUController()
    return vTUController.buyData(req, res)
})
router.post(ROUTE_PAYCONNECT_AIRTIME, (req, res)=>{
    const vTUController = new VTUController()
    return vTUController.buyAirtime(req, res)
})


module.exports = router