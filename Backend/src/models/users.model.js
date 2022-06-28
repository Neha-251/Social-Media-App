const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
    {
        name: {type: String, required: false},
        email: { type: String, required: true, unique: true},
        password: {type: String, required: false},
        dob: {type: String, required: false},
        city: {type: String, required: false}
    }
)

const User = mongoose.model("users", UserSchema);

module.exports = User;