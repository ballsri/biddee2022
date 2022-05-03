
    const express = require('express');
    const User = require('../models/users');
    const jwt_decode = require('jwt-decode');
    const Car = require('../models/cars');
    var router = express.Router();

    router.get('/', async function(req, res, next){
        var userId = '' ;
        var user = '';
        if(req.session.token !== undefined){
            userId = jwt_decode(req.session.token).id;
            var user = await User.findById(userId);
        }

        var newly = [];
        var endsoon = [];
        var all = [];
        var expired = [];
        var carAll =  await new Promise((resolve,reject)=>{
            Car.find({isApproved:true},function(err,res){
                resolve(res)
            });
        })
        for(var i = 0; i < carAll.length;i++){
            var car = carAll[i];
            if(car.isExpired){
                expired.push(car);
                continue;
            }
            var time = new Date(car.startTime).getTime();
            var now = new Date().getTime();
            var distance = time-now;
            if(distance > 0){
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));  
                if(days <2){
                    endsoon.push(car);
                } else if( days>=5 ) {
                    newly.push(car);
                }
                all.push(car);
            // console.log(car)
           }
        }
        // console.log(newly)

    
        
        res.render('auction', {title: 'AUCTION', user:user, newly : newly, endsoon: endsoon, all:all, expired:expired});
    })
    router.get("/searched-result", async function(req,res,next){
        var find = req.query.q
        // console.log(find)
        function containsSpecialChars(str) {
            const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            return specialChars.test(str);
          }
          var userId = '' ;
          var user = '';
          if(req.session.token !== undefined){
              userId = jwt_decode(req.session.token).id;
              var user = await User.findById(userId);
            }
            if(containsSpecialChars(find)){
                return res.render('notFound', {title: 'Error : 404', user:user})
            }
        var newly = [];
        var endsoon = [];
        var result = [];
        var expired = [];
        var carAll =  await new Promise((resolve,reject)=>{
            Car.find({
                $or: [
                    {
                    'carProp.make':{
                        $regex: new RegExp(find, 'i')
                    }},
                    {

                        'carProp.model':{
                            $regex: new RegExp(find, 'i')
                        },
                    },
                    {

                        'carProp.year':{
                            $regex: new RegExp(find, 'i')
                        },
                    },
                    {

                        'carProp.description':{
                            $regex: new RegExp(find, 'i')
                        },
                    },
                    {

                        'carProp.location':{
                            $regex: new RegExp(find, 'i')
                        },
                    },
                    {

                        'carProp.color':{
                            $regex: new RegExp(find, 'i')
                        },
                    },
                    {

                        'carProp.regisYear':{
                            $regex: new RegExp(find, 'i')
                        },
                    },
                    {

                        lastPrice:{
                            $regex: new RegExp(find, 'i')
                        }
                    }
                    
                ]
            },function(err,res){
                resolve(res)
            });
        })
        for(var i = 0; i < carAll.length;i++){
            var car = carAll[i];
            if(car.isExpired && car.isApproved){
                expired.push(car);
                continue;
            }
            var time = new Date(car.startTime).getTime();
            var now = new Date().getTime();
            var distance = time-now;
            if(distance > 0 && car.isApproved){
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));  
                if(days <2){
                    endsoon.push(car);
                } else if( days>=5 ) {
                    newly.push(car);
                }
                result.push(car);
            // console.log(car)
           }
        }
        res.render('searched_auction', {title: "SEARCH RESULT",user:user, newly : newly, endsoon: endsoon, result:result, expired:expired})

            

    })

  


    router.get("/car", async function(req,res,next){
        const carId = req.query.id;
        var QnoA = new Array()
        var QwithA = new Array()

        var userId = '' ;
        var user = '';
        if(req.session.token !== undefined){
            userId = jwt_decode(req.session.token).id;
            var user = await User.findById(userId);
        }


        try{
            var car = await Car.findById(carId);
            if(! car.isApproved) throw new Error('hee');
            var seller = await User.findById(car.userId);
            car.arrayOfQ_A.forEach(qanda => {
                if(qanda.isAns){
                    QwithA.push(qanda)
                }
                else{
                    QnoA.push(qanda)
                }
            });

        } catch (error) {
            res.render('notFound', {title: 'Error : 404', user:user})
            return;

        }
        
        res.render('auction_detail', {title:car.carProp.make,car: car, user : user, seller:seller, QnoA:QnoA, QwithA : QwithA});
    
    })
    

module.exports = router;    
