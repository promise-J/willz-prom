const CatalogService = require("../services/catalog.service");
const  BaseController = require("./base");

class CatalogController extends BaseController{
    async createCatalog(req, res){
        const catalogService = new CatalogService()
        const createCatalog = await catalogService.createCatalog(req)
        if(!createCatalog.success){
            return BaseController.sendFailedResponse(res, createCatalog.data)
        }
        return BaseController.sendSuccessResponse(res, createCatalog.data)
    }
    async editCatalog(req, res){
        const catalogService = new CatalogService()
        const editCatalog = await catalogService.editCatalog(req)
        if(!editCatalog.success){
            return BaseController.sendFailedResponse(res, editCatalog.data)
        }
        return BaseController.sendSuccessResponse(res, editCatalog.data)
    }
    async getCatalog(req, res){
        const catalogService = new CatalogService()
        const getCatalog = await catalogService.getCatalog(req)
        if(!getCatalog.success){
            return BaseController.sendFailedResponse(res, getCatalog.data)
        }
        return BaseController.sendSuccessResponse(res, getCatalog.data)
    }
    async deleteCatalog(req, res){
        const catalogService = new CatalogService()
        const deleteCatalog = await catalogService.deleteCatalog(req)
        if(!deleteCatalog.success){
            return BaseController.sendFailedResponse(res, deleteCatalog.data)
        }
        return BaseController.sendSuccessResponse(res, deleteCatalog.data)
    }
    async getAllCatalogByVendor(req, res){
        const catalogService = new CatalogService()
        const getAllCatalogByVendor = await catalogService.getAllCatalogByVendor(req)
        if(!getAllCatalogByVendor.success){
            return BaseController.sendFailedResponse(res, getAllCatalogByVendor.data)
        }
        return BaseController.sendSuccessResponse(res, getAllCatalogByVendor.data)
    }
}

module.exports = CatalogController