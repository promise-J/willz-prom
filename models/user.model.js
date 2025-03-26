const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    username: {
      type: String,
      required: [true, "user name is required"],
      trim: true,
    },
    first_name: {
      type: String,
      required: [true, "first_name is required"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "last_name is required"],
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    phone_number: {
      type: String,
      trim: true,
      // required: [true, "phone_number is required"],
    },
    verification_code: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
    password_verification_code: {
      type: String,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    image: {
      type: {},
      default: {
        imageUrl:
          "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
        publicId: "",
      },
      required: true,
    },
    deviceName: {
      type: String,
    },
    userType: {
      type: String,
      enum: ["admin", "client", "vendor"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategories: {
      type: [],
    },
    profileComplete: {
      type: String,
      default: "NO",
    },
    slogan: {
      type: String
    },
    about: {
      type: String
    },
    offerType: {
      type: String
    },
    companyName: {
      type: String
    },
    country: {
      type: String
    },
    state: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const hashPassword = await bcrypt.hash(this.password, 10);
      this.password = hashPassword;
    }
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};
userSchema.methods.generateToken = async function (secret_token) {
  const token = jwt.sign(
    {
      id: this._id,
      phone_number: this.phone_number,
      userType: this.userType,
    },
    secret_token,
    { expiresIn: "48h" }
  );
  return token;
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
