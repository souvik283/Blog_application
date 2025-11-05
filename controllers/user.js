const mongoose = require("mongoose")

const User = require("../models/user")
const express = require("express")



async function handleUserSignup(req, res) {
    const profileImgUrl = req.file ? `/images/${req.file.filename}` : "/images/default_img.jpg"
    const {firstname, lastname, email, password} = req.body
    await User.create({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
        profileImgUrl: profileImgUrl
    })

    return res.redirect("/")
}

async function handleUserSignin(req, res) {
    let {email, password} = req.body

    try {
    const token = await User.userMatched(email, password)
    res.cookie("token", token).redirect("/")
    } catch (error) {
        res.render("signin", {
            error: "Incrroct Username & Password."
        })
    } 
    
}

async function handleUserLogout(req, res) {
    res.clearCookie("token").redirect("/")
}

module.exports = {
    handleUserSignup,
    handleUserSignin,
    handleUserLogout
}