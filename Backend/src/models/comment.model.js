const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema(
    {
        parent_id: {type: String, required: true},
        comments:[
            {
               user_id: {type: String, required: false},
               comment: {type: String, required: false}
            }
        ]
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;