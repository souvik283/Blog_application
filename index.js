const express = require("express")
const path = require("path")

const app = express()
const port = 4002;

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.get("/", (req, res)=>{
    res.render("signup")
})

app.listen(port, ()=>{
    console.log(`Server Started at port: ${port}`)
})