const PaystackService = require("../services/paystack.service");
const  BaseController = require("./base");

class PaystackController extends BaseController{
    async createPaymentLink(req, res){
        const paystackService = new PaystackService()
        const createPaymentLink = await paystackService.createPaymentLink(req)

        if(!createPaymentLink.success){
            return BaseController.sendFailedResponse(res, createPaymentLink.data)
        }
        return BaseController.sendSuccessResponse(res, createPaymentLink.data)
    }
    async verifyPayment(req, res){
        const paystackService = new PaystackService()
        const verifyPayment = await paystackService.verifyPayment(req)

        if(!verifyPayment.success){
            return BaseController.sendFailedResponse(res, verifyPayment.data)
        }
        return BaseController.sendSuccessResponse(res, verifyPayment.data)
    }
}

module.exports = PaystackController