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
    async getTransactions(req, res){
        const transactionService = new TransactionService()
        const getTransactions = await transactionService.getTransactions(req, res)
        if(!getTransactions.success){
            return BaseController.sendFailedResponse(res, getTransactions.data)
        }
        return BaseController.sendSuccessResponse(res, getTransactions.data)
    }
}

module.exports = PayConnectController