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
}

module.exports = TransactionService;
