var express = require('express');
var router = express.Router();
var booking = require('./bookingSchema');
var checkDate = require('../functions');
router.post('/',(req,res)=>{
    //converting dates
    var checkInDate = new Date(req.body.checkInDate);
    var checkOutDate = new Date(req.body.checkOutDate);
    var bookingDate = new Date();
    //add records to collection
    if(!checkDate(checkInDate,checkOutDate)){
        return res.status(400).json({
            message : "Invalid Dates!",
            checkInDate,
            checkOutDate
        });
    }
    booking.create({
        name : req.body.name,
        email : req.body.email,
        phoneNumber : req.body.phoneNumber,
        address : req.body.address,
        city : req.body.city,
        state : req.body.state,
        pin : req.body.pin,
        country : 'USA',
        checkInDate,
        checkOutDate ,
        bookingDate ,
        roomCount : req.body.roomCount,
        amountPaid : req.body.amountPaid
    },
    (err,booking)=>{
        if(err)
            return res.status(500).json(
                {
                    message : "Error adding Booking",
                    error : err.message
                }
            );
        return res.status(200).json({
            message : 'Added Booking',
            booking : booking
        })
    });
});
//display all bookings
router.get('/',(req,res)=>{
    booking.find({},(err,bookings)=>{
        if(err){
            return res.status(500).json({
                message : err.message
            });
        }
        return res.status(200).json({
            count : bookings.length,
            bookings,
        });
    });
});

//get bookings by email
router.get('/:email',(req,res)=>{
    booking.find({
        email : req.params.email
    },
    (err,docs)=>{
        if(err){
            return res.status(500).json({
                message : "Error loading the documents",
                error : err.message
            });
        }
        if(docs.length > 0)
            return res.status(200).json({
                count : docs.length,
                bookings : docs     
            });
        else{
            return res.status(404).json({
                message :"No Bookings found"
            })
        }
    });
});
module.exports = router;