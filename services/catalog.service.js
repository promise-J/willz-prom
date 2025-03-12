const CatalogModel = require("../models/catalog.model");
const { empty } = require("../util");
const validateData = require("../util/validate");
const BaseService = require("./base");

class CatalogService extends BaseService {
  async createCatalog(req) {
    try {
      const post = req.body;
      const validateRule = {
        vendor: "string|required",
        name: "string|required",
        description: "string|required",
        price: "string|required",
        images: "array|required",
      };
      const validateMessage = {
        required: ":attribute is required",
        string: ":attribute must be a string",
        array: ":attribute must be an array",
      };

      const catalogExists = await CatalogModel.findOne({ name: post.name });
      if (catalogExists) {
        return BaseService.sendFailedResponse({
          error: "Catalog name already exist",
        });
      }
      const validateResult = validateData(post, validateRule, validateMessage);
      if (!validateResult.success) {
        return BaseService.sendFailedResponse({ error: validateResult.data });
      }
      const newCatalog = new CatalogModel(post);
      await newCatalog.save();

      return BaseService.sendSuccessResponse({
        message: "Catalog created",
        new: await CatalogModel.find({}),
      });
    } catch (error) {
      console.log(error, "the error");
      BaseService.sendFailedResponse(this.server_error_message);
    }
  }
  async editCatalog(req) {
    try {
      const post = req.body;
      const catalogId = req.params.id;

      const catalogExists = await CatalogModel.findOne({
        name: post.name,
        _id: { $ne: catalogId },
      });

      if (catalogExists) {
        return BaseService.sendFailedResponse({
          error: "Catalog name already exist",
        });
      }

      const updatedCatalog = await CatalogModel.findByIdAndUpdate(
        catalogId,
        { $set: post },
        { new: true }
      );

      if (!updatedCatalog) {
        return BaseService.sendFailedResponse({ error: "Catalog not found" });
      }

      return BaseService.sendSuccessResponse({
        message: "Catalog updated",
        new: await CatalogModel.find({}),
      });
    } catch (error) {
      console.log(error, "the error");
      BaseService.sendFailedResponse(this.server_error_message);
    }
  }
  async getCatalog(req) {
    try {
      const catalogId = req.params.id

      if(!catalogId){
        return BaseService.sendFailedResponse({
            error: "Please provide a vendor id"
        })
      }

      const catalog = await CatalogModel.findById(catalogId)

      return BaseService.sendSuccessResponse({
        message: catalog,
      });

    } catch (error) {
      console.log(error, "the error");
      BaseService.sendFailedResponse(this.server_error_message);
    }
  }
  async deleteCatalog(req) {
    try {
      const catalogId = req.params.id;

      const catalogExists = await CatalogModel.findById(catalogId);

      if (!catalogExists) {
        return BaseService.sendFailedResponse({
          error: "Catalog name does not exists",
        });
      }

      const updatedCatalog = await CatalogModel.findByIdAndDelete(catalogId);

      return BaseService.sendSuccessResponse({
        message: "Catalog deleted successful",
      });
    } catch (error) {
      BaseService.sendFailedResponse(this.server_error_message);
    }
  }
  async getAllCatalogByVendor(req) {
    try {
      const { vendorId } = req.query;
      if (empty(vendorId)) {
        return BaseService.sendFailedResponse({
          error: "Please provide a vendor id",
        });
      }
      const allVendorCatalog = await CatalogModel.find({});

      return BaseService.sendSuccessResponse({ message: allVendorCatalog });
    } catch (error) {
      console.log(error, "the error");
      BaseService.sendFailedResponse(this.server_error_message);
    }
  }
}

module.exports = CatalogService;
