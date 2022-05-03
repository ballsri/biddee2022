module.exports = function(app){

    const User = require('../models/users')
    const car = require('../models/cars')
    const Q_A = require('../models/Q_A')
    const jwt = require('jsonwebtoken')
    const JWT_SECRET = process.env.JWT_SECRET
    const jwt_decode = require('jwt-decode')
    
        app.post('/newQuestion', async (req, res) => {
            const question = req.body.question
            const carID = req.body.carID
            var userId = '' ;
            var user = '';
            if(req.session.token !== undefined){
                userId = jwt_decode(req.session.token).id;
                user = await User.findById(userId);
            }
            else{
                return res.json({ status: 'error', error: 'Please login first.' })
            }
        

            try {
                var curCar = await car.findById(carID)
                const qanda = new Q_A({question: question, username: user.firstname + " " + user.lastname})
                curCar.arrayOfQ_A.push(qanda)
                curCar.save()
                // console.log('User created successfully: ', response)
            } catch (error) {
                if (error.code === 11000) {
                    // duplicate key
                    return res.json({ status: 'error', error: 'Please login first.' })
                }
                throw error
            }
            
            res.json({ status: 'ok' })
        })
        
}