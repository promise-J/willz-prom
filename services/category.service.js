const CategoryModel = require("../models/category.model");
const { empty } = require("../util");
const validateData = require("../util/validate");
const BaseService = require("./base");

class UtilService extends BaseService {
  async createCategory(req) {
    try {
        const post = req.body;
        const validateRule = {
          name: "string|required",
          categories: "array|required",
          categoryType: "string|required",
        };
        const validateMessage = {
          required: ":attribute is required",
          string: ":attribute must be a string",
          array: ":attribute must be an array",
        };
  
        const categoryExists = await CategoryModel.findOne({name: post.name})
        if(categoryExists){
            return BaseService.sendFailedResponse({error: 'Category name already exist'})
        }
        const validateResult = validateData(post, validateRule, validateMessage);
        if (!validateResult.success) {
          return BaseService.sendFailedResponse({error: validateResult.data});
        }
        const newCategory = new CategoryModel(post)
        await newCategory.save()

        return BaseService.sendSuccessResponse({message: 'Category created', new: await CategoryModel.find({})})

    } catch (error) {
      console.log(error, "the error");
      BaseService.sendFailedResponse(this.server_error_message);
    }
  }
  async editCategory(req) {
    try {
        const post = req.body;
        const categoryId = req.params.id
  
        const categoryExists = await CategoryModel.findOne({name: post.name, _id: {$ne: categoryId}})

        if(categoryExists){
            return BaseService.sendFailedResponse({error: 'Category name already exist'})
        }
        
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            categoryId,
            { $set: post },
            { new: true }
          );

          if (!updatedCategory) {
            return BaseService.sendFailedResponse({error: 'Category not found'})
          }
      
        return BaseService.sendSuccessResponse({message: 'Category updated', new: await CategoryModel.find({})})

    } catch (error) {
      console.log(error, "the error");
      BaseService.sendFailedResponse(this.server_error_message);
    }
  }
  async deleteCategory(req) {
    try {
        const categoryId = req.params.id
  
        const categoryExists = await CategoryModel.findById(categoryId)

        if(!categoryExists){
            return BaseService.sendFailedResponse({error: 'Category name does not exists'})
        }
        
        const updatedCategory = await CategoryModel.findByIdAndDelete(
            categoryId
          );
      
        return BaseService.sendSuccessResponse({message: 'Category deleted successful'})

    } catch (error) {
      BaseService.sendFailedResponse(this.server_error_message);
    }
  }
  async getAllCategory() {
    try {
        
        const allCategory = await CategoryModel.find({})

        return BaseService.sendSuccessResponse({message: allCategory})

    } catch (error) {
      console.log(error, "the error");
      BaseService.sendFailedResponse(this.server_error_message);
    }
  }
}

module.exports = UtilService;
