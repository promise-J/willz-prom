const CategoryModel = require("../models/category.model");
const VendorModel = require("../models/vendor.model");
const { empty } = require("../util");
const validateData = require("../util/validate");
const BaseService = require("./base");

class VendorService extends BaseService {
  async updateVendor(req) {
    try {
        const post = req.body;
        const vendorId = req.params.id
        const updatedVendor = await VendorModel.findByIdAndUpdate(vendorId, {$set: post}, {new: true})
        if(updatedVendor){
            return BaseService.sendFailedResponse({error: 'Vendor not found. Please try again later'})
        }

        return BaseService.sendSuccessResponse({message: 'Vendor Updated'})

    } catch (error) {
      console.log(error, "the error");
      BaseService.sendFailedResponse(this.server_error_message);
    }
  }
}

module.exports = VendorService;
