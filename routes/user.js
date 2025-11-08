const express = require("express")
const multer = require("multer")

const {handleUserSignup,
    handleUserSignin,
    handleUserLogout
} = require("../controllers/user")

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./images")
    },
    filename: (req, file, cb)=>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

router.get("/login", (req, res)=>{
    res.render("login", {
        user: req.user
    })
})
router.get("/signin", (req, res)=>{
    return res.render("signin", {
        user: req.user
    })
})
router.get("/profile", (req, res)=>{
    return res.render("profile", {
        user: req.user
    })
})


router.get("/logout", handleUserLogout)


router.post("/signup", upload.single("profileImg"), handleUserSignup)
router.post("/signin", handleUserSignin)

module.exports = router