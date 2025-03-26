const CategoryService = require("../services/category.service");
const  BaseController = require("./base");

class CategoryController extends BaseController{
    async createCategory(req, res){
        const categoryService = new CategoryService()
        const createCategory = await categoryService.createCategory(req)
        if(!createCategory.success){
            return BaseController.sendFailedResponse(res, createCategory.data)
        }
        return BaseController.sendSuccessResponse(res, createCategory.data)
    }
    async editCategory(req, res){
        const categoryService = new CategoryService()
        const editCategory = await categoryService.editCategory(req)
        if(!editCategory.success){
            return BaseController.sendFailedResponse(res, editCategory.data)
        }
        return BaseController.sendSuccessResponse(res, editCategory.data)
    }
    async deleteCategory(req, res){
        const categoryService = new CategoryService()
        const deleteCategory = await categoryService.deleteCategory(req)
        if(!deleteCategory.success){
            return BaseController.sendFailedResponse(res, deleteCategory.data)
        }
        return BaseController.sendSuccessResponse(res, deleteCategory.data)
    }
    async getAllCategory(req, res){
        const categoryService = new CategoryService()
        const getAllCategory = await categoryService.getAllCategory(req)
        if(!getAllCategory.success){
            return BaseController.sendFailedResponse(res, getAllCategory.data)
        }
        return BaseController.sendSuccessResponse(res, getAllCategory.data)
    }
    async getVendorsByCategory(req, res){
        const categoryService = new CategoryService()
        const getVendorsByCategory = await categoryService.getVendorsByCategory(req)
        if(!getVendorsByCategory.success){
            return BaseController.sendFailedResponse(res, getVendorsByCategory.data)
        }
        return BaseController.sendSuccessResponse(res, getVendorsByCategory.data)
    }
}

module.exports = CategoryController