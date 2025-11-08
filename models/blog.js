const {model, Schema} = require("mongoose")


const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    coverImageUrl: {
        type: String,

    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
}, {timestamps: true})

const Blog = model("blog", blogSchema)

module.exports = Blog