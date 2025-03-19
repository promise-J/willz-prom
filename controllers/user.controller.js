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
    async loginUser(req, res){
        const userService = new UserService()
        const loginUser = await userService.loginUser(req, res)
        if(!loginUser.success){
            return BaseController.sendFailedResponse(res, loginUser.data)
        }
        return BaseController.sendSuccessResponse(res, loginUser.data)
    }
    async googleAuthEmail(req, res){
        const userService = new UserService()
        const googleAuthEmail = await userService.googleAuthEmail(req, res)
        if(!googleAuthEmail.success){
            return BaseController.sendFailedResponse(res, googleAuthEmail.data)
        }
        return BaseController.sendSuccessResponse(res, googleAuthEmail.data)
    }
    async verifyEmail(req, res){
        const userService = new UserService()
        const verifyEmail = await userService.verifyEmail(req, res)
        if(!verifyEmail.success){
            return BaseController.sendFailedResponse(res, verifyEmail.data)
        }
        return BaseController.sendSuccessResponse(res, verifyEmail.data)
    }
    async getUser(req, res){
        const userService = new UserService()
        const getUser = await userService.getUser(req, res)
        if(!getUser.success){
            return BaseController.sendFailedResponse(res, getUser.data)
        }
        return BaseController.sendSuccessResponse(res, getUser.data)
    }
    async fundAccount(req, res){
        const userService = new UserService()
        const fundAccount = await userService.fundAccount(req, res)
        if(!fundAccount.success){
            return BaseController.sendFailedResponse(res, fundAccount.data)
        }
        return BaseController.sendSuccessResponse(res, fundAccount.data)
    }
    async registerUser(req, res){
        const userService = new UserService()
        const registerUser = await userService.registerUser(req, res)
        if(!registerUser.success){
            return BaseController.sendFailedResponse(res, registerUser.data)
        }
        return BaseController.sendSuccessResponse(res, registerUser.data)
    }
}

module.exports = UserController