module.exports = function(app){

    const Car = require('../models/cars.js')
    const Bidder = require('../models/bidders.js')
    const User = require('../models/users.js')

    var sem = require('semaphore')(1);    
    app.post('/bid', async (req, res) => {
        const { userId,
            price,
            carId,
            cur_price} = req.body
            
            // console.log(Number(car.lastPrice) === Number(cur_price)-3000);
            
            if(userId  === '' || userId === undefined){
                return res.json({ status: 'error', code : 1000, error: 'Please login before bid' })
                
            }
            if(Number(price) %1000 !== 0){
                return res.json({ status: 'error', code : 2000, error: 'Your new price must ends with 000' })
            }
            
            // console.log(userId);
            const user = await User.findById(userId);
            
            if(!user.isBuyable){
                return res.json({ status: 'error', code: 1001,error: 'Please verify your credit card before bid' });
            }
            
            
            const bidder = new Bidder({
                carId : carId,
                userId: userId,
                price: price,
                firstname: user.firstname,
                lastname: user.lastname
            })
            sem.take( async function(){

                const car = await Car.findById(carId);
                
                if(Number(car.lastPrice)+3000 !== Number(cur_price) ){
                    sem.leave()
                    return res.json({ status: 'error', code: 2000,error: 'Latest price has been updated, please try again' });
                }
                car.auction.push(bidder);
                // console.log('LP : '+ car.lastPrice);
                // console.log(price);
                car.lastPrice = price;
                car.lastId = user._id;
                car.save( function( err, result){
                    if(err){
                        sem.leave()
                        return res.json({ status: 'error',code: 2000, error: 'Bid failed, please try again' })
                    }
                    // console.log(result.auction[result.auction.length-1])
                    // console.log(result.lastPrice);
                    if( result) {
                        sem.leave();
                        user.bids.push(bidder);
                        user.save( function( err, result) {
                            if(err){
                            return res.json({ status: 'error',code: 1000, error: 'Please login before bid' })
                        }
                        if(result){
                            
                            res.json({ status: 'ok' })
                        }
                    })

                    
                    
                }
        });
        
    })
       
            
            // console.log('User created successfully: ', response)
        
        
        
    })
}