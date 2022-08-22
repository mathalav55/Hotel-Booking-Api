
var checkDate = function(inDate,outDate){
    var date = new Date();
    inDate = new Date(inDate);
    outDate = new Date(outDate);
    if( inDate < date || outDate < date)
        return false;
    else if( inDate.getTime() > outDate.getTime())
        return false;
    return true;    
}
module.exports = checkDate;

//messenging

//SMS
const accountSid = process.env.TWILIO_ACCOUNT_SID;; 
const authToken = process.env.TWILIO_AUTH_TOKEN;; 
const client = require('twilio')(accountSid, authToken); 

const sendSMS = function(phoneNumber,message){
    client.messages 
    .create({   
        body: message,  
        messagingServiceSid: '',      
        to: phoneNumber 
    }) 
    .then(message => console.log(message.sid)) 
    .done();
};
//whatsapp
const sendWhatsApp = function(phoneNumber,message){
    client.messages 
    .create({ 
        body: message, 
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,       
        to: `whatsapp:${phoneNumber}` 
      }) 
     .then(message => console.log(message.sid)) 
     .done();
}

