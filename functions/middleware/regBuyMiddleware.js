const jwt = require('jsonwebtoken');
const User = require('../models/users.js');
const JWT_SECRET =process.env.JWT_SECRET;


const regBuyAuth = (req,res,next) =>{
    const token = req.session.token;

   
    if(token){
        jwt.verify(token,JWT_SECRET, async (err, decoded)=> {
            // console.log(decoded);
            if(err){
                res.redirect('/auth/login');
            } else{
                var user = await User.findById(decoded.id);
                // console.log(user);
                if(user){
                    if(!user.isBuyable){
                        next();
                    } else{
                        res.redirect('/auth/login');
                    }
                } else {
                    res.redirect('/auth/login');
                }

                
            }
        });
    }else{
        res.redirect('/auth/login');
    }


}

module.exports = regBuyAuth;