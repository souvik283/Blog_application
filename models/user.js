const {mongoose, model, Schema} = require("mongoose")
const {createHmac, randomBytes} = require("crypto")

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

userSchema.pre("save", function (next){
    const user = this
    if(! user.isModified("password")) return;

    const salt = randomBytes(10).toString()
    const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex")

    this.salt= salt
    this.password = hashedPassword

    next()
})

userSchema.static("userMatched", async function (email, password) {
   const user2 = await this.findOne({email})
   if(!user2){ throw new Error("User not found")}
   let salt= user2.salt
   const hashedPassword = user2.password;

       const userGivenPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex")

    if (hashedPassword !== userGivenPassword) {
        throw new Error("Incorrect password")
    }
    return user2
})

const User = model("user", userSchema)

module.exports = User