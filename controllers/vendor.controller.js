const VendorService = require("../services/vendor.service");
const BaseController = require("./base");

class VendorController extends BaseController {
  async createCategory(req, res) {
    const VendorService = new VendorService();
    const createCategory = await VendorService.createCategory(req);
    if (!createCategory.success) {
      return BaseController.sendFailedResponse(res, createCategory.data);
    }
    return BaseController.sendSuccessResponse(res, createCategory.data);
  }
  async editCategory(req, res) {
    const VendorService = new VendorService();
    const editCategory = await VendorService.editCategory(req);
    if (!editCategory.success) {
      return BaseController.sendFailedResponse(res, editCategory.data);
    }
    return BaseController.sendSuccessResponse(res, editCategory.data);
  }
}

module.exports = VendorController;
