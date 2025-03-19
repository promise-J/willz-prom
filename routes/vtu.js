const VTUController = require('../controllers/vtu.controller')
const auth = require('../middlewares/auth')
const { ROUTE_PAYCONNECT_GET_NETWORK } = require('../util/page-route')

const router = require('express').Router()

router.get(ROUTE_PAYCONNECT_GET_NETWORK, (req, res)=>{
    const vTUController = new VTUController()
    return vTUController.getNetwork(req, res)
})


module.exports = router