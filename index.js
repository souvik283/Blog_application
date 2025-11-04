const express = require("express")
const path = require("path")
const app = express()
const userRoute = require("./routes/user")
const mongoose = require("mongoose")

const port = 4002;

mongoose
    .connect("mongodb://127.0.0.1:27017/Blogyfy")
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
        console.log(err)
    })

    app.use(express.urlencoded({extended: false}))

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", (req, res) => {
    res.render("home")
})

app.use("/user", userRoute)

app.listen(port, () => {
    console.log(`Server Started at port: ${port}`)
})