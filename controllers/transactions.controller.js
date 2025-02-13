const TransactionService = require("../services/transaction.service");
const  BaseController = require("./base");

class PayConnectController extends BaseController{
    async createTransaction(req, res){
        const transactionService = new TransactionService()
        const createTransaction = await transactionService.createTransaction(req, res)
        if(!createTransaction.success){
            return BaseController.sendFailedResponse(res, createTransaction.data)
        }
        return BaseController.sendSuccessResponse(res, createTransaction.data)
    }
}

module.exports = PayConnectController