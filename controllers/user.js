const mongoose = require("mongoose")
const multer = require("multer")

const User = require("../models/user")
const express = require("express")

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./images")
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage})

async function handleUserSignup(req, res) {
    // if(req.body.profileImg){
    // const a = await upload.single({})
    //     console.log(a)
    // }
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

    try {
    const token = await User.userMatched(email, password)
    res.cookie("token", token).redirect("/")
    } catch (error) {
        res.render("signin", {
            error: "Incrroct Username & Password."
        })
    } 
    
}

module.exports = {
    handleUserSignup,
    handleUserSignin
}