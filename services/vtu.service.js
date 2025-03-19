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
      const {network, mobile_number, plan} = req.body

      const validateRule = {
        network: "email|required",
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
        mobile_network,
        plan
      }


      const response = await axios.post('https://mypayconnect.com/api/data/', {
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

  static filterNotAvailablePlans(array) {
    let result = []
    if(Array.isArray(array)){
      result = array.filter(plan => !plan.month_validate.includes("(NOT AVAILABLE)") && plan.plan_size > 0);
    }
    return result;
  }
}

module.exports = VTUService;
