const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        profile_pic: {type: String, required: false},
        name: {type: String, required: false},
        username: {type: String, required: false, unique: true},
        email: { type: String, required: true, unique: true},
        password: {type: String, required: true},
        dob: {type: String, required: false},
        city: {type: String, required: false}
    }
)

const User = mongoose.model("users", UserSchema);

module.exports = User;