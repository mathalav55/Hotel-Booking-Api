var express = require('express');
var router = express.Router();

var Availability = require('./availabilitySchema');

//add or update room availability for a date
router.get('/',async (req,res)=>{
    //check for checkIn and checkout dates
    if( req.body.checkInDate && req.body.checkOutDate){
        var maxRooms = 12;
        var inDate = new Date(req.body.checkInDate);
        var outDate = new Date(req.body.checkOutDate);
        inDate = new Date(inDate.getTime() - inDate.getTimezoneOffset() * 60000);
        outDate = new Date(outDate.getTime() - outDate.getTimezoneOffset() * 60000);
        if( !checkDate(inDate,outDate)){
            return res.status(400).json({
                message : "Invalid Dates",
                inDate,
                outDate
            });
        }
        var availabilityArray = new Array();
        do{
            var response = await Availability.find({
                date : inDate
            }).then(async docs =>{
                var result;
                if(docs.length > 0){
                    return docs[0].roomsAvailable;
                }
                else{
                    return maxRooms;
                }
            }).catch(err =>{
                return err.message
            });
            availabilityArray.push(response);
            if( inDate.getTime() != outDate.getTime())
                inDate.setDate(inDate.getDate()+1);
            else    
                break;
        }while(true);

        var availableRooms = Math.min(...availabilityArray);

        return res.status(200).json({
            availableRooms
        });
    }else{
        return res.status(500).json({
            message : "Check in and Chekout dates are required!"
        });
    }
});

router.post('/',async (req,res)=>{
    //check for checkIn and checkout dates
    if( req.body.checkInDate && req.body.checkOutDate && req.body.roomCount){
        var maxRooms = 12;
        var inDate = new Date(req.body.checkInDate);
        var outDate = new Date(req.body.checkOutDate);
        inDate = new Date(inDate.getTime() - inDate.getTimezoneOffset() * 60000);
        outDate = new Date(outDate.getTime() - outDate.getTimezoneOffset() * 60000);
    
        if(!checkDate(inDate,outDate)){
            return res.status(400).json({
                message : "Invalid Dates",
                inDate,
                outDate
            });
        }
        var availabilityArray = new Array();
        do{
            var response = await Availability.find({
                date : inDate
            }).then(async docs =>{
                var result;
                if(docs.length > 0){
                    result = await Availability.updateOne({
                        date : inDate
                    },{
                        roomsAvailable : docs[0].roomsAvailable - req.body.roomCount
                    }).then( doc =>{
                        return {
                            status : "ok",
                            message : doc
                        };
                    }).catch( err =>{
                        return {
                            status : "error",
                            message : err.message
                        };
                    });
                    return result;
                }
                else{
                    result = await Availability.create({
                        date : inDate,
                        roomsAvailable : maxRooms - req.body.roomCount
                    })
                    .then( docs =>{
                        return {
                            status : "ok",
                            message : doc
                        };
                    })
                    .catch(err =>{
                        return {
                            status : "error",
                            message : err.message
                        };
                    });
                    return result;
                }
            }).catch(err =>{
                return {
                    status : "error",
                    message : err.message
                };
            });
            availabilityArray.push(response);
            if( inDate.getTime() != outDate.getTime())
                inDate.setDate(inDate.getDate()+1);
            else    
                break;
        }while(true);

        return res.status(200).json({
            availabilityArray
        });
    }else{
        return res.status(500).json({
            message : "Check in and Chekout dates and room count are required!"
        })
    }
});

router.patch('/',async (req,res)=>{
     //check for checkIn and checkout dates
     if( req.body.checkInDate && req.body.checkOutDate && req.body.roomCount){
        var maxRooms = 12;
        var inDate = new Date(req.body.checkInDate);
        var outDate = new Date(req.body.checkOutDate);
        inDate = new Date(inDate.getTime() - inDate.getTimezoneOffset() * 60000);
        outDate = new Date(outDate.getTime() - outDate.getTimezoneOffset() * 60000);
        
        if( !checkDate(inDate,outDate)){
            return res.status(400).json({
                message : "Invalid Dates",
                inDate,
                outDate
            });
        }
        var availabilityArray = new Array();
        do{
            var response = await Availability.find({
                date : inDate
            }).then(async docs =>{
                var result;
                if(docs.length > 0){
                    result = await Availability.updateOne({
                        date : inDate
                    },{
                        roomsAvailable : docs[0].roomsAvailable + req.body.roomCount
                    }).then( doc =>{
                        return {
                            status : "ok",
                            message : doc
                        };
                    }).catch( err =>{
                        return {
                            status : "error",
                            message : err.message
                        };
                    });
                    return result;
                }
                else{
                    return "Date not found!"
                }
            }).catch(err =>{
                return {
                    status : "error",
                    message : err.message
                };
            });
            availabilityArray.push(response);
            if( inDate.getTime() != outDate.getTime())
                inDate.setDate(inDate.getDate()+1);
            else    
                break;
        }while(true);

        return res.status(200).json({
            response : availabilityArray
        });
    }else{
        return res.status(500).json({
            message : "Check in and Chekout dates and room count are required!"
        })
    }
});
function checkDate(inDate,outDate){
    var date = new Date();
    inDate = new Date(inDate);
    outDate = new Date(outDate);
    if( inDate.getTime() < date.getTime() || outDate.getTime() < date.getTime())
        return false;
    else if( inDate.getTime() > outDate.getTime)
        return false;
    return true;
}
module.exports = router;