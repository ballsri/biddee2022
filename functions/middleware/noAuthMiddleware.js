


const noAuth = (req,res,next) =>{
    const token = req.session.token;

   
    if(token){
        res.redirect('/');
    }else{
        next()
    }


}

module.exports = noAuth;