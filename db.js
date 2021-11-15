var mongoose = require('mongoose');

mongoose.connect(
    "mongodb+srv://admin:M42gjtqvhri0ZISh@little-creek.kemju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
).catch(err=>{
    console.log(err.message);
    return "Error Connecting DB";
});