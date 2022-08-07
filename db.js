require('dotenv').config()
var mongoose = require('mongoose');
var userName = '';
var password = '';
mongoose.connect(
    "mongodb+srv://admin:"+process.env.MONGO_PASSWORD+"@little-creek.kemju.mongodb.net/?retryWrites=true&w=majority"
)
.then(()=>{
    console.log("Connection Successful");
})
.catch(err=>{
    console.log(err.message);
    return "Error Connecting DB";
});