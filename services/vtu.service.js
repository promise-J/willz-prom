const { buildEmailTemplate, sendMail } = require("../util/emailService");
const BaseService = require("./base");
const { empty } = require("../util");
const axios = require('axios');
const validateData = require("../util/validate");

class VTUService extends BaseService {
  constructor(){
    super()
  }
  async getNetwork(req, res) {
    try {
      const networkType = req.query.networkType
      if(empty(networkType)){
        return BaseService.sendFailedResponse({error: 'Please provide a network type'})
      }
      const response = await axios.get('https://mypayconnect.com/api/get/network/', {
        headers: {
          'Authorization': `Token ${this.payconnect_token}`,
          'Content-Type': 'application/json'
        }
      });

      if(response.status == 200){
        const all_plans = VTUService.filterNotAvailablePlans(response.data[networkType].data_plans)
        return BaseService.sendSuccessResponse({message: all_plans})
      }else{
        return BaseService.sendFailedResponse({error: 'Something went wrong. Please try again later'})
      }
    } catch (error) {
      console.log(error,'the error')
      return BaseService.sendFailedResponse({error: 'Server errpr. Please try again later'})
    }
  
  }
  async buyData(req, res) {
    try {
      const post = req.body;
      const {network, mobile_number, plan} = post

      const validateRule = {
        network: "string|required",
        mobile_number: "string|required",
        plan: "string|required",
      };
      const validateMessage = {
        required: ":attribute is required",
        string: ":attribute must be a string",
      };

      const validateResult = validateData(post, validateRule, validateMessage);
      if (!validateResult.success) {
        return BaseService.sendFailedResponse({error: validateResult.data});
      }


      const payload = {
        Ported_number: true,
        network,
        mobile_number,
        plan
      }


      const response = await axios.post('https://mypayconnect.com/api/data/', payload, {
        headers: {
          'Authorization': `Token ${this.payconnect_token}`,
          'Content-Type': 'application/json'
        }
      });
      if(response.data.Status == 'successful'){
        return BaseService.sendSuccessResponse({message: 'You have successfully purchased data'})
      }else{
        return BaseService.sendFailedResponse({error: 'Something went wrong. Please try again later'})
      }
    } catch (error) {
      console.log(error.message,'the error')
      return BaseService.sendFailedResponse({error: error.message})
    }
  
  }
  async buyAirtime(req, res) {
    try {
      const post = req.body;
      const {network, mobile_number, amount} = post

      const validateRule = {
        network: "string|required",
        mobile_number: "string|required",
        amount: "string|required",
      };
      const validateMessage = {
        required: ":attribute is required",
        string: ":attribute must be a string",
      };

      const validateResult = validateData(post, validateRule, validateMessage);
      if (!validateResult.success) {
        return BaseService.sendFailedResponse({error: validateResult.data});
      }


      const payload = {
        Ported_number: true,
        network,
        mobile_number,
        amount,
        airtime_type: 'VTU'
      }


      const response = await axios.post('https://mypayconnect.com/api/topup/', payload, {
        headers: {
          'Authorization': `Token ${this.payconnect_token}`,
          'Content-Type': 'application/json'
        }
      });

      if(!empty(response.data.Status) && response.data.Status === 'successful'){
        return BaseService.sendSuccessResponse({message: 'You have successfully purchased airtime'})
      }else{
        return BaseService.sendFailedResponse({error: 'Something went wrong. Please try again later'})
      }
      
    } catch (error) {
      console.log(error.message,'the error')
      return BaseService.sendFailedResponse({error: error.message})
    }
  
  }

  static filterNotAvailablePlans(array) {
    let result = []
    if(Array.isArray(array)){
      result = array.filter(plan => !plan.month_validate.includes("(NOT AVAILABLE)") && plan.plan_size > 0);
    }
    return result;
  }
}

module.exports = VTUService;
