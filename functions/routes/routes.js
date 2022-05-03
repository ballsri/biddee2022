const JWT_SECRET = process.env.JWT_SECRET;
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const User = require('../models/users');
    const jwt_decode = require('jwt-decode');
   
    var router = express.Router();

    router.get('/', async function(req, res, next){
        var userId = '' ;
        var user = '';
        if(req.session.token !== undefined){
            userId = jwt_decode(req.session.token).id;
            var user = await User.findById(userId);
        }
        
        res.render('home', {title: 'HOME',user:user});
    })

    router.get('/contact', async function(req, res, next){
        
        var userId = '' ;
        var user = '';
        if(req.session.token !== undefined){
            userId = jwt_decode(req.session.token).id;
            var user = await User.findById(userId);
        }
        res.render('contact', {title: 'CONTACT', user:user});
    })

    router.get('/about', async function(req, res, next){
        
        var userId = '' ;
        var user = '';
        if(req.session.token !== undefined){
            userId = jwt_decode(req.session.token).id;
            var user = await User.findById(userId);
        }
        res.render('wsbid', {title: 'ABOUT', user:user});
    })

    router.get("/password-reset", async function(req,res,next){
        const userId = req.query.id;
        const token = req.query.token;
        

        const user = await User.findOne({ userId })
        if(!user){
            res.send( 'Error occured, user doesn\'t exists' );
            return 
        }
        
        try {
            const payload = jwt.verify(token,JWT_SECRET);
            res.render('resetPassword', {title:'RESET PASSWORD', userId : userId});
            
        } catch (error){
            res.render('expiredResetPWLink', {title:'LINK EXPIRED'});
            
        }
    })
    
  

module.exports = router;    
