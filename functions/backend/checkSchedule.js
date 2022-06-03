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
            var now = new Date();

		    now = now.getTime();
            var time = new Date(element.startTime);

		    time = time.getTime();

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
