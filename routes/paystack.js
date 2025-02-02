const PaystackController = require('../controllers/paystack.controller')
const { image_uploader } = require('../util/imageUpload')
const { ROUTE_IMAGE_UPLOAD_MULTIPLE, ROUTE_IMAGE_UPLOAD_SINGLE, ROUTE_PAYSTACK_CREATE_PAYMENT_LINK, ROUTE_PAYSTACK_VERIFY_PAYMENT } = require('../util/page-route')

const router = require('express').Router()


router.post(ROUTE_PAYSTACK_CREATE_PAYMENT_LINK,(req, res)=>{
    const paystackController = new PaystackController()
    return paystackController.createPaymentLink(req, res)
})
router.get(ROUTE_PAYSTACK_VERIFY_PAYMENT,(req, res)=>{
    const paystackController = new PaystackController()
    return paystackController.verifyPayment(req, res)
})

module.exports = router