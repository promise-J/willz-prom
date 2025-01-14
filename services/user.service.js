const { buildEmailTemplate, sendMail } = require("../util/emailService");
const BaseService = require("./base");
const UserModel = require("../models/user.model");
const { empty } = require("../util");
const validateData = require("../util/validate");

class UserService extends BaseService {
  async createUser(req, res) {
    try {
      const post = req.body;

      const validateRule = {
        email: "email|required",
        password: "string|required|min:8",
        username: "string|required",
        first_name: "string|required",
        last_name: "string|required",
      };
      const validateMessage = {
        required: ":attribute is required",
        string: ":attribute must be a string",
        "email.email": "Please provide a valid :attribute.",
      };

      const validateResult = validateData(post, validateRule, validateMessage);
      if (!validateResult.success) {
        return BaseService.sendFailedResponse({error: validateResult.data});
      }

      const userExists = await UserModel.findOne({email: post.email})

      if(!empty(userExists)){
        return BaseService.sendFailedResponse({error: 'User exist. Please login!'})
      }

      let newUser = new UserModel(post);
      newUser = await newUser.save();

      const emailData = {
        link: this.base_url + `verify-email?email=${newUser.email}`,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
      }

      const emailOption = {
        to: post.email,
        from: "App Ser",
        subject: "Registration Successful",
        html: await buildEmailTemplate("verify_email.ejs", emailData),
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
  async loginUser(req) {
    try {
      const post = req.body;

      const validateRule = {
        email: "email|required",
        password: "string|required|min:8",
      };
      const validateMessage = {
        required: ":attribute is required",
        string: ":attribute must be a string",
        "email.email": "Please provide a valid :attribute.",
      };

      const validateResult = validateData(post, validateRule, validateMessage);
      if (!validateResult.success) {
        return BaseService.sendFailedResponse({error: validateResult.data});
      }

      const userExists = await UserModel.findOne({email: post.email})

      if(empty(userExists)){
        return BaseService.sendFailedResponse({error: 'User does not exist. Please signup!'})
      }

      if (!(await userExists.comparePassword(post.password))) {
        return BaseService.sendFailedResponse({
          error: "Wrong email or password",
        });
      }

    //   if(userExists.is_verified == false){
    //     return BaseService.sendFailedResponse({error: 'Please verify your account'})
    //   }

      const token = await userExists.generateToken(process.env.TOKEN_SECRET || 'enter_your_key!.')


      return BaseService.sendSuccessResponse({
        message: token,
      });

      //  send a mail to user on successful registration
    } catch (error) {
        console.log(error)
        return BaseService.sendFailedResponse({error: this.server_error_message})
    }
  }
  async verifyEmail(req) {
    try {
      const post = req.body;

      const validateRule = {
        email: "email|required",
      };
      const validateMessage = {
        required: ":attribute is required",
        string: ":attribute must be a string",
        "email.email": "Please provide a valid :attribute.",
      };

      const validateResult = validateData(post, validateRule, validateMessage);
      if (!validateResult.success) {
        return BaseService.sendFailedResponse({error: validateResult.data});
      }

      const userExists = await UserModel.findOne({email: post.email})

      if(empty(userExists)){
        return BaseService.sendFailedResponse({error: 'User does not exist. Please try again later.!'})
      }

      if(userExists.is_verified){
        return BaseService.sendFailedResponse({error: 'You are already verified. Please login'})
      }

      userExists.is_verified = true

      await userExists.save()

      return BaseService.sendSuccessResponse({
        message: 'Your account has been verified.',
      });

      //  send a mail to user on successful registration
    } catch (error) {
        console.log(error)
        return BaseService.sendFailedResponse({error: this.server_error_message})
    }
  }
  async googleAuthEmail(req, res) {
    try {
      const post = req.body;

      const userExists = await UserModel.findOne({email: post.email})

      if(empty(userExists)){
        //sign up
        const newUser = new UserModel(post)
        await newUser.save()

        const emailData = {
            link: this.base_url + `verify-email?email=${newUser.email}`,
            email: newUser.email,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
          }

    
          const emailOption = {
            to: post.email,
            from: "App Ser",
            subject: "Registration Successful",
            html: await buildEmailTemplate("verify_email.ejs", emailData),
          };
          await sendMail(emailOption, res);
        return BaseService.sendSuccessResponse({message: 'Registration successful. Please login!', google_type: 'register'})
      }else{
        //sign in
        // if(userExists.is_verified == false){
        //     return BaseService.sendFailedResponse({error: 'Please verify your account'})
        // }
        const token = await userExists.generateToken(process.env.TOKEN_SECRET || 'enter_your_key!.')
        return BaseService.sendSuccessResponse({message: token, google_type: 'login'})
    }

    } catch (error) {
        console.log(error)
        return BaseService.sendFailedResponse({error: this.server_error_message})
    }
  }
  async getUser(req) {
    try {
      const user_id = req.user.id;

      const user_details = await UserModel.findById(user_id)

      if(empty(user_details)){
        return BaseService.sendFailedResponse({error: 'Something went wrong trying to fetch your account.'})
      }

      return BaseService.sendSuccessResponse({message: user_details})

    } catch (error) {
        console.log(error)
        return BaseService.sendFailedResponse({error: this.server_error_message})
    }
  }
}

module.exports = UserService;
