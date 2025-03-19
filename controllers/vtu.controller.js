const VTUService = require("../services/vtu.service");
const BaseController = require("./base");


class VTUController extends BaseController{
    async getNetwork(req, res){
        const vtuService = new VTUService()
        const getNetwork = await vtuService.getNetwork(req)
        if(!getNetwork.success){
            return BaseController.sendFailedResponse(res, getNetwork.data)
        }
        return BaseController.sendSuccessResponse(res, getNetwork.data)
    }
}

module.exports = VTUController