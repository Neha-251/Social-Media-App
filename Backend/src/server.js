const app = require("./index");
const connect = require("./config/db");

app.listen(process.env.PORT || 5000, async()=>{
    try {
        await connect();
        console.log("listening on port 5000");
    } catch (error) {
        console.log("error", error);
    }
    
});