const { empty } = require("../util");

class BaseController {

	constructor(){
		this.server_error_message = 'Something went wrong. Please try again later'
	}
    static sendSuccessResponse(res, data) {
		res.send({success: true, data});
	}

    static sendFailedResponse(res, data) {
		res.send({success: false, data});
	}
}

module.exports = BaseController;
