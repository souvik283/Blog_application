const express = require("express")
const path = require("path")
const cookies = require("cookie-parser")
const {checkForAuthanticationToken} = require("./middleware/auth")
const userRoute = require("./routes/user")
const mongoose = require("mongoose")


const app = express()
const port = 4002;

mongoose
    .connect("mongodb://127.0.0.1:27017/Blogyfy")
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
        console.log(err)
    })

app.use(express.urlencoded({ extended: false }))
app.use(cookies())
app.use("/images", express.static("images"));

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(checkForAuthanticationToken("token"))

app.get("/", (req, res) => {
    res.render("home", {
        user: req.user
    })
})

app.use("/user", userRoute)

app.listen(port, () => {
    console.log(`Server Started at port: ${port}`)
})