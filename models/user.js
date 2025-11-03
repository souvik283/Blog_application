const {mongoose, model} = require("mongoose")


const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    salt: {
        type: String,
        required:true
    },
    password:{
        type: String,
        required: true
    },
    profileImgUrl: {
        type: String,
        default: "/images/default_img.jpg"
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
},
{timestamps: true})

const User = model("user", userSchema)

module.exports = User