const jwt = require("jsonwebtoken")
// const { use } = require("react")

const secret = "souvik41205"
 
function createTokenForUser(user) {
    const playlod = {
        _id : user._id,
        email: user.email,
        role: user.role,
        fullName: `${user.firstName} ${user.lastName}`,
        profileImgUrl: user.profileImgUrl
    }
    const token = jwt.sign(playlod, secret)

    return token;
}

function verifyUser (token) {
    const playlod = jwt.verify(token, secret)
    return playlod
    
}

module.exports = {
    createTokenForUser,
    verifyUser
}