const { buildEmailTemplate, sendMail } = require("../util/emailService");
const BaseService = require("./base");
const UserModel = require("../models/user.model");
const { empty } = require("../util");
const validateData = require("../util/validate");

class PayConnectService extends BaseService {
  async getNetwork(req, res) {

    try {
      const baseService = new BaseService()
      const request = await baseService.requestToPayConnect('GET', 'network')
      console.log(request.data, 'from the service')
      console.log('reached here')
      return BaseService.sendSuccessResponse({message: 'sent'})
    } catch (error) {
        console.log(error.message)
        return BaseService.sendFailedResponse({error: error.messge})
    }
  }
}

module.exports = PayConnectService;
