const mongoose = require("mongoose");


const reactionSchema = new mongoose.Schema(
    {
        parent_id: {type: String, required: true},
        reactions: [
            {
                user_id: { type: String, required: false},
                reaction: {type: String, required: false}
            }
        ]
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const Reaction = mongoose.model("posts", reactionSchema);

module.exports = Reaction;