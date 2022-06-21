const mongoose = require("mongoose");


const postSchema = new mongoose.Schema(
    {
        post_file: {type: String, required: false},
        title: {type: String, required: false},
        decription: {type: String, required: false},
        user_id: {type: String, required: true}
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Post = mongoose.model("post", postSchema);

module.exports = Post;