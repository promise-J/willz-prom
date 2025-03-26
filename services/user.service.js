const { buildEmailTemplate, sendMail } = require("../util/emailService");
const BaseService = require("./base");
const UserModel = require("../models/user.model");
const { empty } = require("../util");
const validateData = require("../util/validate");
const { getDeviceInfo } = require("../util/deviceInfo");
const CategoryModel = require("../models/category.model");
const TransactionModel = require("../models/transaction.model");
const RefferalModel = require("../models/referral.model");

class UserService extends BaseService {
  async createUser(req, res) {
    try {
      let post = req.body;

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
        return BaseService.sendFailedResponse({ error: validateResult.data });
      }

      const deviceInfo = getDeviceInfo();

      const refferal = await UserModel.findOne({ username: post.refferal});


      const userExists = await UserModel.findOne({
        $or: [{ email: post.email }, { username: post.username }],
      });

      if (!empty(userExists)) {
        return BaseService.sendFailedResponse({
          error: "User exist. Please login!",
        });
      }

      post = { ...post, deviceName: deviceInfo.deviceName };

      let newUser = new UserModel(post);

      if(!empty(refferal)){
        await RefferalModel.create({refferedBy: refferal._id, userId: newUser._id})
      }

      newUser = await newUser.save();

      const emailData = {
        link: this.base_url + `verify-email?email=${newUser.email}`,
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        userType: post.userType,
      };

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
    } catch (error) {
      console.log(error);
      return BaseService.sendFailedResponse({
        error: this.server_error_message,
      });
    }
  }
  async loginUser(req) {
    try {
      const post = req.body;
      const deviceInfo = getDeviceInfo();
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
        return BaseService.sendFailedResponse({ error: validateResult.data });
      }

      const adminExists = await UserModel.findOne({
        email: post.email,
        userType: "admin",
      });

      if (adminExists && adminExists.userType == "admin") {
        if (adminExists.deviceName !== deviceInfo.deviceName) {
          return BaseService.sendFailedResponse({
            error: `An attempt to login in as an admin in another (${deviceInfo.deviceName}) device detected!`,
          });
        } else {
          if (!(await adminExists.comparePassword(post.password))) {
            return BaseService.sendFailedResponse({
              error: "Wrong email or password",
            });
          }

          const token = await adminExists.generateToken(
            process.env.TOKEN_SECRET || "enter_your_key!."
          );
          return BaseService.sendSuccessResponse({
            message: token,
          });
        }
      }

      const userExists = await UserModel.findOne({ email: post.email });

      if (empty(userExists)) {
        return BaseService.sendFailedResponse({
          error: "User does not exist. Please signup!",
        });
      }

      if (!userExists.userType) {
        return BaseService.sendFailedResponse({
          error: "You have not completed your profile.",
        });
      }

      if (!(await userExists.comparePassword(post.password))) {
        return BaseService.sendFailedResponse({
          error: "Wrong email or password",
        });
      }

      //   if(userExists.is_verified == false){
      //     return BaseService.sendFailedResponse({error: 'Please verify your account'})
      //   }

      const token = await userExists.generateToken(
        process.env.TOKEN_SECRET || "enter_your_key!."
      );

      return BaseService.sendSuccessResponse({
        message: token,
      });

      //  send a mail to user on successful registration
    } catch (error) {
      console.log(error);
      return BaseService.sendFailedResponse({
        error: this.server_error_message,
      });
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
        return BaseService.sendFailedResponse({ error: validateResult.data });
      }

      const userExists = await UserModel.findOne({ email: post.email });

      if (empty(userExists)) {
        return BaseService.sendFailedResponse({
          error: "User does not exist. Please try again later.!",
        });
      }

      if (userExists.is_verified) {
        return BaseService.sendFailedResponse({
          error: "You are already verified. Please login",
        });
      }

      userExists.is_verified = true;

      await userExists.save();

      return BaseService.sendSuccessResponse({
        message: "Your account has been verified.",
      });

      //  send a mail to user on successful registration
    } catch (error) {
      console.log(error);
      return BaseService.sendFailedResponse({
        error: this.server_error_message,
      });
    }
  }
  async googleAuthEmail(req, res) {
    try {
      const post = req.body;

      const userExists = await UserModel.findOne({ email: post.email });

      if (empty(userExists)) {
        //sign up
        const newUser = new UserModel(post);
        await newUser.save();

        const emailData = {
          link: this.base_url + `verify-email?email=${newUser.email}`,
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          userType: "",
        };

        const emailOption = {
          to: post.email,
          from: "App Ser",
          subject: "Registration Successful",
          html: await buildEmailTemplate("verify_email.ejs", emailData),
        };
        await sendMail(emailOption, res);
        return BaseService.sendSuccessResponse({
          message: "Registration successful. Please login!",
          google_type: "register",
        });
      } else {
        //sign in
        // if(userExists.is_verified == false){
        //     return BaseService.sendFailedResponse({error: 'Please verify your account'})
        // }
        if (!userExists.userType) {
          return BaseService.sendFailedResponse({
            error: "incomplete-registration",
          });
        }
        const token = await userExists.generateToken(
          process.env.TOKEN_SECRET || "enter_your_key!."
        );
        return BaseService.sendSuccessResponse({
          message: token,
          google_type: "login",
          userType: userExists.userType,
        });
      }
    } catch (error) {
      console.log(error);
      return BaseService.sendFailedResponse({
        error: this.server_error_message,
      });
    }
  }
  async getUser(req) {
    try {
      const user_id = req.user.id;

      let user_details = {};
      user_details = await UserModel.findById(user_id).populate("category");

      if (empty(user_details)) {
        return BaseService.sendFailedResponse({
          error: "Something went wrong trying to fetch your account.",
        });
      }

      return BaseService.sendSuccessResponse({ message: user_details });
    } catch (error) {
      console.log(error);
      return BaseService.sendFailedResponse({
        error: this.server_error_message,
      });
    }
  }
  async fundAccount(req) {
    try {
      const post = req.body;
      const user_id = req.user.id;

      const validateRule = {
        type: "string|required",
        amount: "integer|required",
        description: "string|required",
        trxref: "string|required",
        transaction: "string|required",
        recipient: "string|required",
        status: "string|required",
      };
      const validateMessage = {
        required: ":attribute is required",
        string: ":attribute must be a string",
        integer: ":attribute must be a number",
      };

      const validateResult = validateData(post, validateRule, validateMessage);
      if (!validateResult.success) {
        return BaseService.sendFailedResponse({ error: validateResult.data });
      }

      const user = await UserModel.findById(user_id);

      if (empty(user)) {
        return BaseService.sendFailedResponse({
          error: "Something went wrong trying to fetch your account.",
        });
      }

      const existingTrans = await TransactionModel.findOne({
        userId: user_id,
        trxref: post.trxref,
        transaction: post.transaction,
      });

      if (existingTrans) {
        return BaseService.sendFailedResponse({
          error: "Request to fund has been successful.",
        });
      }

      const transactionData = {
        ...post,
        userId: user_id,
      };
      await TransactionModel.create(transactionData);

      user.balance = Number(user.balance) + Number(post.amount);
      await user.save();
      return BaseService.sendSuccessResponse({
        message: "Account funded successfully",
      });
    } catch (error) {
      console.log(error);
      return BaseService.sendFailedResponse({
        error: this.server_error_message,
      });
    }
  }
  async registerUser(req, res) {
    try {
      let post = req.body;

      const validateRule = {
        userType: "string|required",
        email: "string|required",
      };
      const validateMessage = {
        required: ":attribute is required",
        string: ":attribute must be a string",
      };

      const validateResult = validateData(post, validateRule, validateMessage);
      if (!validateResult.success) {
        return BaseService.sendFailedResponse({ error: validateResult.data });
      }
      const userExists = await UserModel.findOne({ email: post.email });

      if (empty(userExists)) {
        return BaseService.sendFailedResponse({
          error: "User does not exist. Please register!",
        });
      }

      if (
        post.userType == "vendor" &&
        (empty(post.category) || empty(post.subcategories))
      ) {
        return BaseService.sendFailedResponse({
          error: "Please provide your category and subcategory",
        });
      }

      let category = {};
      if (post.userType == "vendor") {
        category = await CategoryModel.findById(post.category);
      }

      if (post.userType == "vendor") {
        userExists.userType = post.userType;
        userExists.category = post.category;
        userExists.subcategories = post.subcategories;
        userExists.offerType = category.categoryType;
      } else {
        userExists.userType = post.userType;
      }

      await userExists.save();

      return BaseService.sendSuccessResponse({
        message: "Registration successful",
      });

      //  send a mail to user on successful registration
    } catch (error) {
      console.log(error);
      return BaseService.sendFailedResponse({
        error: this.server_error_message,
      });
    }
  }
}

module.exports = UserService;
