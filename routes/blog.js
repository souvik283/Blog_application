const express = require("express")
const Blog = require("../models/blog")
const multer = require("multer")

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./images2")
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

router.get("/add-blog", (req, res)=>{
     res.render("add-blog", {
        user: req.user
     })
})

router.get("/my-blog", async(req, res)=>{
    let allBlogs = await Blog.find({createdBy: req.user._id})
     res.render("myblogs", {
        user: req.user,
        blogs: allBlogs
     })
})

router.post("/add-blog", upload.single("coverImg"), async(req, res)=>{
    const coverImgUrl = req.file ? `/images2/${req.file.filename}` : "/images2/default2_img.jpg"

    let { title, description} = req.body;
    
    await Blog.create({
      title: title,
      description: description,
      coverImageUrl: coverImgUrl,
      createdBy: req.user._id
    })
    res.redirect("/")
})

router.get("/:id", async(req, res)=>{
    const blog_id = req.params.id;
    const blog = await Blog.findOne({_id: blog_id})
// console.log(blog)
    res.render("blog", {
        user: req.user,
        blog: blog
    })
})



module.exports = router;