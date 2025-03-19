require("dotenv").config();
const jwt = require("jsonwebtoken");
const { empty } = require("../util");

async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    console.log({authHeader})

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Please provide a valid token to proceed (1)",
      });
    }

    if(authHeader.split(" ").filter(item => item !== 'null').length < 2){
      return res.status(401).json({
        success: false,
        error: "Please provide a valid token to proceed (2)",
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
    req.user = {
      id: decoded.id,
      phone_number: decoded.phone_number,
      user_role: decoded.user_role,
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

module.exports = auth;
