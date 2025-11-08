const express = require("express")
const path = require("path")
const cookies = require("cookie-parser")
const {checkForAuthanticationToken} = require("./middleware/auth")
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const mongoose = require("mongoose")
const Blog = require("./models/blog")


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
app.use(express.json())
app.use(cookies())
app.use("/images", express.static("images"));
app.use("/images2", express.static("images2"));

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(checkForAuthanticationToken("token"))

app.get("/", async(req, res) => {
    let allBlogs =   await Blog.find({}).populate("createdBy")
    // console.log(allBlogs)
    res.render("home", {
        user: req.user,
        blogs: allBlogs
    })
})

app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.listen(port, () => {
    console.log(`Server Started at port: ${port}`)
})