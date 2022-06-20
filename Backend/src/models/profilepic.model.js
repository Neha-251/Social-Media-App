const mongoose = require("mongoose");


const profilepicSchema = new mongoose.Schema(
    {
        profile_pic: {type: String, required: true, unique: true},
        user_id: {type: String, required: true}
    }
)

const Profilepic = mongoose.model("profilepic", profilepicSchema);

module.exports = ProfilePic;