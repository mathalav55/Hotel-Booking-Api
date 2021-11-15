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