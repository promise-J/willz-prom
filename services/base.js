const { empty } = require("../util");

class BaseService {
    constructor(){
        this.server_error_message = 'Something went wrong. Please try again later'
    }
    static sendFailedResponse(data) {
        const returnData = { success: false };
        if (!empty(data) || data === "0" || data === 0 || data === "") {
            returnData.data = data;
        }
        return returnData;
    }

    static sendSuccessResponse(data) {
        const returnData = { success: true };
        if (!empty(data) || data === 0 || data === "0" || data === "") {
            returnData.data = data;
        }
        return returnData;
    }
}

module.exports = BaseService