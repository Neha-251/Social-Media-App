const mongoose = require("mongoose");


const postSchema = new mongoose.Schema(
    {
        post_file: {
            data: Buffer,
            contentType: String,
        },
        title: {type: String, required: false},
        description: {type: String, required: false},

        parent_id: {type: String, required: false},

        profile_img: {
            data: Buffer,
            contentType: String,
        },
        user_id: {type:mongoose.Schema.Types.ObjectId,
            ref:"users",
            required:false
        },

        reaction_id: {type:mongoose.Schema.Types.ObjectId,
            ref:"reactions",
            required:false
        },

        comment_id: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comments",
            required:false
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Post = mongoose.model("post", postSchema);

module.exports = Post;