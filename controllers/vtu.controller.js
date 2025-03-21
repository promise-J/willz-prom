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
    async buyData(req, res){
        const vtuService = new VTUService()
        const buyData = await vtuService.buyData(req)
        if(!buyData.success){
            return BaseController.sendFailedResponse(res, buyData.data)
        }
        return BaseController.sendSuccessResponse(res, buyData.data)
    }
    async buyAirtime(req, res){
        const vtuService = new VTUService()
        const buyAirtime = await vtuService.buyAirtime(req)
        if(!buyAirtime.success){
            return BaseController.sendFailedResponse(res, buyAirtime.data)
        }
        return BaseController.sendSuccessResponse(res, buyAirtime.data)
    }
}

module.exports = VTUController