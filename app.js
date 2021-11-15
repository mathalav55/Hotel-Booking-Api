var express = require('express');
var db = require('./db');
var bookingController = require('./booking/bookingController');
var availabilityController = require('./availability/availabilityController');
app = express();

app.use(express.urlencoded({
    extended : true
}));
app.use(express.json());

app.use('/booking',bookingController);
app.use('/availability',availabilityController);

//handle all other routes
app.use('/' , (req , res, next) =>{
    const err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use((err , req , res , next) =>{
    res.status(err.status || 500);
    res.json({
        message : err.message,
    });
});

module.exports = app;