const axios = require("axios");
const { empty } = require("../util");
const BaseService = require("./base");
const validateData = require("../util/validate");

class PaystackService extends BaseService {
  async createPaymentLink(req) {
    try {
      const post = req.body;

      const validateRule = {
        email: "string|required",
        amount: "integer|required",
      };
      const validateMessage = {
        required: ":attribute is required",
        string: ":attribute must be a string",
      };

      const validateResult = validateData(post, validateRule, validateMessage);
      if (!validateResult.success) {
        return BaseService.sendFailedResponse({ error: validateResult.data });
      }
      const { email, amount } = post;

      const response = await axios.post(
        "https://api.paystack.co/transaction/initialize",
        {
          email,
          amount: amount * 100,
        },
        {
          headers: {
            Authorization: `Bearer ${this.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      const paymentUrl = response.data.data.authorization_url;
      return BaseService.sendSuccessResponse({ message: paymentUrl });
    } catch (error) {
      BaseService.sendFailedResponse(this.server_error_message);
    }
  }
  async verifyPayment(req) {
    try {
      let response = {};
      const post = req.query;
      const validateRule = {
        trxref: "string|required",
      };

      const validateMessage = {
        required: ":attribute is required",
        string: ":attribute must be a string",
      };

      const validateResult = validateData(post, validateRule, validateMessage);
      if (!validateResult.success) {
        return BaseService.sendFailedResponse({ error: validateResult.data });
      }
      const {trxref} = post

      const verificationResponse = await axios.get(
        `https://api.paystack.co/transaction/verify/${trxref}`,
        {
          headers: {
            Authorization: `Bearer ${this.PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      response = verificationResponse.data
      console.log({resp: response, pk: this.PAYSTACK_SECRET_KEY})
    //   if(empty(verificationResponse.data.status)){
    //       return BaseService.sendFailedResponse(response);
    //   }
      return BaseService.sendSuccessResponse({message: 'sent'});
    } catch (error) {
      console.log({ error });
      BaseService.sendFailedResponse(this.server_error_message);
    }
  }
}

module.exports = PaystackService;
