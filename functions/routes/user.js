const router = require('express').Router(),
      jwt_decode = require('jwt-decode'),
      Car = require('../models/cars.js'),
      User = require('../models/users.js');

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});


router.get('/mylist', async (req, res, next) => {
  var userId = '' ;
  var user = '';
  if(req.session.token !== undefined){
      userId = jwt_decode(req.session.token).id;
      var user = await User.findById(userId);
  }
  var carSellex = [];
  var carSell = [];
  var carWon = [];
  var carSellList =  await new Promise((resolve,reject)=>{
      Car.find({userId: userId},function(err,res){
          resolve(res)
      });
  })
  var carWonList = await new Promise((resolve, reject) =>{
    Car.find({'_id':{
      $in : (user.carsWon)
    }},(function(err,res){
      resolve(res)

    }))
      
  })
     
    
  // console.log(carWon)
  
  for(var i = 0; i < carSellList.length;i++){
      var car = carSellList[i];
      if(car.isExpired){
        carSellex.push(car);
      } else{
        
        carSell.push(car);
      }
  }
  for(var i = 0; i < carWonList.length;i++){
    var car = carWonList[i];
    carWon.push(car);
}
  

    res.render('listing',{title:"LISTING", user:user, carSell:carSell,carWon:carWon ,carSellex: carSellex});
});

router.get('/verify', function(req, res, next){
        
        
  res.render('regCreditCompleted', {title: 'Verified'});
})

router.get('/logout', async function(req, res, next){
  delete req.session.token;
  var userId = '' ;
        var user = '';
        if(req.session.token !== undefined){
            userId = jwt_decode(req.session.token).id;
            var user = await User.findById(userId);
        }
  res.redirect('/')
})

module.exports = router;