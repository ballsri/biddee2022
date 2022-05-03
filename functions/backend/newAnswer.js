module.exports = function(app){

    const User = require('../models/users')
    const car = require('../models/cars')
    const Q_A = require('../models/Q_A')
    const jwt = require('jsonwebtoken')
    const JWT_SECRET = process.env.JWT_SECRET
    const jwt_decode = require('jwt-decode')
    const mongoose = require('mongoose');
    
        app.post('/newAnswer', async (req, res) => {
            const answer = req.body.answer
            const carID = req.body.carID
            const questionID = req.body.questionID
            var userId = '' ;
            var user = '';
            var sellerID = '';
            if(req.session.token !== undefined){
                userId = jwt_decode(req.session.token).id;
                user = await User.findById(userId);
                const tmp = await car.findById(carID);
                sellerID = tmp.userId
            }
            else{
                return res.json({ status: 'error', error: 'Please login first.' })
            }
            
            if(userId !== sellerID){
                return res.json({ status: 'error', error: 'Only seller can reply' })
            }

            try {
                var curCar = await car.findById(carID)
                
                car.updateOne(
                    { "_id": mongoose.Types.ObjectId(carID), "arrayOfQ_A._id": mongoose.Types.ObjectId(questionID) },
                    {
                        "$set": {
                            "arrayOfQ_A.$.answer": answer,
                            "arrayOfQ_A.$.isAns": true,
                         }
                    },
                    function(err){
                           if(err){
                           console.log(err);
                           }
                    }
                )
               
            } catch (error) {
                if (error.code === 11000) {
                    // duplicate key
                    return res.json({ status: 'error', error: 'Please login first.' })
                }
                throw error
            }
            
            return res.json({ status: 'ok' })
        })
        
}