const JWT_SECRET = process.env.JWT_SECRET;
    const express = require('express');
   
            passport = require('passport')
    var router = express.Router();

    router.get('/signup', function(req, res, next){
        
        
        res.render('signup', {title: 'SIGN UP FORM'});
    })

   

    
    router.get('/login', function(req, res, next){
        
        
        res.render('login', {title: 'LOGIN FORM'});
    })

    
    

    
    
    
    router.get('/forget-password', function(req, res, next){
        
        res.render('forgetPassword', {title: 'FORGET PASSWORD'});
    })
    
    
    
    
   


module.exports = router;    
