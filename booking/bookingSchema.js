var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
    name : {
        first : {
            type :  String,
            required : true
        },
        last : {
            type : String
        },
        middle : {
            type : String
        }
    },
    email : {
        type : String,
        match : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phoneNumber : {
        code : {
            type : Number,
            required : true
        },
        number : {
            type : Number,
            required : true
        }
    },
    country : {
        type : String , 
        required : true
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : String , 
        required : true
    },
    state : {
        type : String , 
        required : true
    },
    pin : {
        type : Number,
        required : true
    },
    checkInDate : {
        type : Date , 
        required : true
    },
    checkOutDate : {
        type : Date , 
        required : true
    },
    bookingDate : {
        type : Date , 
        required : true
    },
    roomCount : {
        type : Number,
        required : true
    },
    amountPaid : {
        type : Number,
        required : true
    }
});


mongoose.model('booking',bookingSchema);
module.exports = mongoose.model('booking');