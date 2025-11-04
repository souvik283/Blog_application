const {verifyUser} = require("../services/auth")

function checkForAuthanticationToken(cookieName) {
    return (req, res, next) =>{
        const userData = verifyUser()
    }
}