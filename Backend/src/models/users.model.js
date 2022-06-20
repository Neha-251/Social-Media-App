const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        profile_pic: {type: String, required: false},
        name: {type: String, required: true},
        username: {type: String, required: true, unique: true},
        email: { type: String, required: true, unique: true},
        password: {type: String, required: true},
        dob: {type: String, required: true},
        city: {type: String, required: true}
    }
)

const User = mongoose.model("users", UserSchema);

module.exports = User;