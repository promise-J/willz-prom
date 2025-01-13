const { buildEmailTemplate, sendMail } = require("../util/emailService");
const BaseService = require("./base");
const UserModel = require("../models/user.model");
const { empty } = require("../util");
const validateData = require("../util/validate");

class UserService extends BaseService {
  async createUser(req, res) {
    try {
      const post = req.body;
      //   if(empty(post)){
      //     return BaseService.sendFailedResponse({error: 'Please provide a valid request'})
      //   }

      const validateRule = {
        email: "email|required",
        password: "string|required|min:8",
        username: "string|required",
      };
      const validateMessage = {
        required: ":attribute is required",
        string: ":attribute must be a string",
        "email.email": "Please provide a valid :attribute.",
      };

      const validateResult = validateData(post, validateRule, validateMessage);
      if (!validateResult.success) {
        return BaseService.sendFailedResponse(validateResult.data);
      }

      const userExists = await UserModel.findOne({email: post.email})

      if(!empty(userExists)){
        return BaseService.sendFailedResponse({error: 'User exist. Please login!'})
      }

      let newUser = new UserModel(post);
      newUser = await newUser.save();
      //   const token = await newUser.generateToken(process.env.TOKEN_SECRET || 'enter_your_key!.')

      const emailOption = {
        to: post.email,
        from: "App Ser",
        subject: "Registration Successful",
        html: await buildEmailTemplate("verify_email.ejs", newUser),
      };
      await sendMail(emailOption, res);
      return BaseService.sendSuccessResponse({
        message: "Registration successful",
      });

      //  send a mail to user on successful registration
    } catch (error) {
        console.log(error)
        return BaseService.sendFailedResponse({error: this.server_error_message})
    }
  }
}

module.exports = UserService;
