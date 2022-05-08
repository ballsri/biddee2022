module.exports = function(){
    const cron = require('node-cron');
    const Car = require('../models/cars.js'),
            User = require('../models/users');
    
    cron.schedule('*/30 * * * * *', function(){
   
        var query = Car.find({isExpired: false}, function(err, results) {

            if(err){
                console.log(err)
                return
            }
            results.forEach( async function(element) {
                // console.log(element.startTime.toUTCString())
                var now = new Date();
//		    console.log(now);
		    now = now.getTime();
                var time = new Date(element.startTime);
		    // console.log(element.startTime);
//		    console.log(time);
		    time = time.getTime();
		    // console.log(time-now);
		    // console.log(element.carProp.make+element.carProp.model);
                if( time-now  <0){
                    element.isExpired = true;
                    console.log(element.carProp.make + " " + element.carProp.model + " is expired.");
                    if(element.auction.length>0) {
                        console.log(element.auction[element.auction.length-1].userId + " has won "+ element.carProp.make + " " + element.carProp.model);
                    
                        var user = await User.findById(element.auction[element.auction.length-1].userId);
                        user.carsWon.push(element._id);
                        user.save();

                    }
                }
                element.save()
                // console.log(element)
            });
        });
       
        
    });

}
