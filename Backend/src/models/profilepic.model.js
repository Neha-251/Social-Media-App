const mongoose = require("mongoose");


const profilepicSchema = new mongoose.Schema(
    {
        profile_pic:{type: String, required: false},
        user_id: {type: String, required: false, unique: true},
        cloudinary_id: {type: String, required: false}
    }
)

const Profilepic = mongoose.model("profilepic", profilepicSchema);

module.exports = Profilepic;