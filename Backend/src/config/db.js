const mongoose = require("mongoose");
require('dotenv').config()



const connect = () => {
    try{
        console.log("connected");
        return mongoose.connect(`mongodb+srv://neha:${process.env.MONGO_PSW}@cluster0.is9rrlv.mongodb.net/?retryWrites=true&w=majority`);
    }catch(err) {
        console.log('err', err)
        return err;
        
    }
   
}



module.exports = connect;