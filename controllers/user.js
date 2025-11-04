const mongoose = require("mongoose")

const User = require("../models/user")

async function handleUserSignup(req, res) {
    const {firstname, lastname, email, password} = req.body
    await User.create({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password
    })

    return res.redirect("/")
}

async function handleUserSignin(req, res) {
    let {email, password} = req.body
   const user = await User.userMatched(email, password)
    console.log(user)   
}

module.exports = {
    handleUserSignup,
    handleUserSignin
}