const mongoose = require("mongoose");
require('dotenv').config()



const connect = () => {
    return mongoose.connect(process.env.MONGODB_URI);
}


module.exports = connect;