const { empty } = require("../util");

class BaseService {
    constructor(){
        this.PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY
        this.server_error_message = 'Something went wrong. Please try again later'
        this.base_url = process.env.NODE_ENV === 'development' ? 'http://localhost:5173/' : 'https://app-sar.onrender.com/'
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