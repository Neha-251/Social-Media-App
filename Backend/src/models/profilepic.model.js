const mongoose = require("mongoose");


const profilepicSchema = new mongoose.Schema(
    {
        profile_pic: {
            data: Buffer,
            contentType: String,
        },
        user_id: {type: String, required: false, unique: true}
    }
)

const Profilepic = mongoose.model("profilepic", profilepicSchema);

module.exports = Profilepic;