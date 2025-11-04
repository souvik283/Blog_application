const express = require("express")
const multer = require("multer")

const {handleUserSignup, handleUserSignin} = require("../controllers/user")



const router = express.Router()

router.get("/signup", (req, res)=>{
    res.render("signup")
})
router.get("/signin", (req, res)=>{
    return res.render("signin")
})

router.post("/signup", handleUserSignup)
router.post("/signin", handleUserSignin)

module.exports = router