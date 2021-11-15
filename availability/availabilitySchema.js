var mongoose = require('mongoose');

var availabiblitySchema = mongoose.Schema({
    date : {
        type : Date,
        required : true
    },
    roomsAvailable : {
        type : Number,
        required : true
    }
});

mongoose.model('Availability',availabiblitySchema);

module.exports = mongoose.model('Availability');