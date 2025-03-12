const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const vendorSchema = new mongoose.Schema({
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
    },
    first_name: {
        type: String,
        required: [true, "first_name is required"],
    },
    last_name: {
        type: String,
        required: [true, "last_name is required"],
    },
    gender: {
        type: String,
        enum: ['male', 'female']
        // required: [true, "gender is required"],
    },
    phone_number: {
        type: String,
        // required: [true, "phone_number is required"],
    },
    verification_code: {
        type: String
    },
    password_verification_code: {
        type: String
    },
    is_verified: {
        type: Boolean,
        default: false
    },
    image: {
        type: {},
        default: {
            imageUrl: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
            publicId: ""
        },
        required: true
    },
    userType: {
        type: String,
        enum: ['client', 'vendor', 'admin']
    },
    deviceName: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    subcategory: {
        type: []
    },
    profileComplete: {
        type: String,
        default: 'NO'
    }
},{
    timestamps: true
});


vendorSchema.pre("save", async function (next) {
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

vendorSchema.methods.comparePassword = async function(password){
    const user  = this
    return await bcrypt.compare(password, user.password)
}
vendorSchema.methods.generateToken = async function(secret_token){
    const token = jwt.sign({id: this._id, phone_number: this.phone_number, user_role: this.user_role}, secret_token, {expiresIn: '48h'})
    return token
}

const VendorModel = mongoose.model("Vendor", vendorSchema);
module.exports = VendorModel;