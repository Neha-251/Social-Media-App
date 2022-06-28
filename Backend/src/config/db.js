const mongoose = require("mongoose");
require('dotenv').config()



const connect = () => {
    try{
        console.log("connected");
        return mongoose.connect("mongodb+srv://neha:neha@cluster0.is9rrlv.mongodb.net/?retryWrites=true&w=majority");
    }catch(err) {
        console.log('err', err)
        return err;
        
    }
   
}

// mongoose.connect(
//     process.env.MONGO_URL
//     (err) => {
//      if(err) console.log(err) 
//      else console.log("mongdb is connected");
//     }
//   );
  
  // or
  
// const connect =  mongoose.connect(
//     process.env.MONGO_URL
//   )
//   .then(()=>console.log('connected'))
//   .catch(e=>console.log(e));
  

module.exports = connect;