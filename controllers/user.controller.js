const UserService = require("../services/user.service");
const  BaseController = require("./base");

class UserController extends BaseController{
    async createUser(req, res){
        const userService = new UserService()
        const createUser = await userService.createUser(req, res)
        if(!createUser.success){
            return BaseController.sendFailedResponse(res, createUser.data)
        }
        return BaseController.sendSuccessResponse(res, createUser.data)
    }
}

module.exports = UserController