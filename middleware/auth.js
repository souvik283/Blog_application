const {verifyUser} = require("../services/auth")

function checkForAuthanticationToken(cookieName) {
    return (req, res, next) =>{
        const cookie = req.cookies[cookieName]
        // console.log(cookie)
        if(!cookie){
           return next()
        }
        try {
            const userData = verifyUser(cookie)
            req.user = userData
            // console.log(userData)

        } catch (error) {}
        return next()
    }
}

module.exports = {
    checkForAuthanticationToken
}