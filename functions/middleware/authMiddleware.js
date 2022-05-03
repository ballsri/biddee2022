
const jwt = require('jsonwebtoken');
const JWT_SECRET =process.env.JWT_SECRET;


const requireAuth = (req,res,next) =>{
    const token = req.session.token;

   
    if(token){
        jwt.verify(token,JWT_SECRET, (err, decoded)=> {

            if(err){

                res.redirect('/auth/login');

            } else{

                next();

            }
        });
    }else{
        
        res.redirect('/auth/login');

    }

}

module.exports = requireAuth;