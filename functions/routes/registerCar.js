
const router = require('express').Router();
const cars = require('../models/cars');
const controller = require('../controller/controller');
const store = require('../middleware/uploadsImage');
const jwt_decode = require('jwt-decode')

// routes
router.get('/', controller.home);
router.get('/displayImg', (req,res,next) => {
    
    var query = cars.find({userId:jwt_decode(req.session.token).id}, function(err,result){
        // result
        res.render('displayImg', {title: "CAR LIST", carList: result});
    })
});
router.get('/success', (req,res,next) => {
    
    res.render('regCarCompleted', {title: "COMPLETED"});
 
});
router.post('/createCar', store.array('images', 30) , controller.uploads)
module.exports = router;