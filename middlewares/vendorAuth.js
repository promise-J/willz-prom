require("dotenv").config();
const jwt = require("jsonwebtoken");
const { empty } = require("../util");

async function vendorAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Please provide a valid token to proceed",
      });
    }

    if(authHeader.split(" ").filter(item => item !== 'null').length < 2){
      return res.status(401).json({
        success: false,
        error: "Please provide a valid token to proceed",
      });
    }

    const token = authHeader.split(" ")[1];
    // check if token is provided
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in",
      });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (decoded.userType != 'vendor') {
        return res.status(401).json({
          success: false,
          message: "This action is strictly for vendors.",
        });
    }
    req.user = {
      id: decoded.id,
      phone_number: decoded.phone_number,
      userType: decoded.userType,
    };
    next();
  } catch (error) {
    if(error.message == 'jwt expired'){
      return res.json({ success: false, message: "jwt_expired" });
    }
    console.log(error.message,'the error message');
    res.json({ success: false, message: "Internal Server Error" });
  }
}

module.exports = vendorAuth;
