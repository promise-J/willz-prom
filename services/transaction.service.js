const BaseService = require("./base");
const { empty } = require("../util");
const validateData = require("../util/validate");
const Transaction = require("../models/transaction.model");


class TransactionService extends BaseService {
  async createTransaction(req) {
    try {
      const body = req.body;
      const transaction = await Transaction.create(body)
      return BaseService.sendSuccessResponse({ message: "Transaction created" });
    } catch (error) {
      console.log(error.message);
      return BaseService.sendFailedResponse({ error: error.messge });
    }
  }
  async getTransactions(req) {
    try {
      const userId = req.query.userId
      const queryData = {}

      if(!empty(userId)){
        queryData.userId = userId
      }

      const transactions = await Transaction.find(queryData)
      return BaseService.sendSuccessResponse({ message: transactions });
    } catch (error) {
      console.log(error.message,'the error');
      return BaseService.sendFailedResponse({ error: error.messge });
    }
  }
}

module.exports = TransactionService;
