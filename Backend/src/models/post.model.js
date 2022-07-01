const mongoose = require("mongoose");


const postSchema = new mongoose.Schema(
    {
        post_file:{type: Array, required: false},
        post_cloudinary_id:{type: Array, required: false},

        title: {type: String, required: false},
        description: {type: String, required: false},

        parent_id: {type: String, required: false},

        profile_img:{type: String, required: false},
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