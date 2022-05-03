module.exports = function (app) {
    const User = require('../models/users.js')
    jwt_decode = require('jwt-decode')
    const alert = require('alert');
    const JWT_SECRET = process.env.JWT_SECRET
   
    var omise = require('omise')({
        'secretKey': 'skey_test_5rgx7qqf7awld6p06q1'
      });

    app.post('/register-bid', async (req, res) => {
        const { name,
            zip,
            phone} = req.body
        if(!req.session.token){

            return res.json({ status :"error", error : "Error, please login before register"})
        }

        
        try {

            var user = await User.findById( jwt_decode(req.session.token).id )

            if(user.OmiId === ''){

                user.name = name;
                user.phone = phone;
                user.zip = zip;
                // console.log(req.body);
                var err = false;
                if(req.body.omise_token !== ''){

                    omise.customers.create({
                        description: user.id,
                        email: user.email,
                        card: req.body.omise_token
                    }, function(error, customer) {
                    /* Response. */
                    
                        if(error){
                            
                            throw error
                        } 
                    // console.log(customer.id)
                        user.isBuyable = true;
                        user.OmiId = customer.id;
                    // console.log(user.isBuyable)
                        user.save();
                    
                    })
                    // alert('success')
                    res.redirect('/user/verify');
                }
                else{

                    if(req.body.token_errors !== '')
                    return res.json({status: 'error', error:"Error occured, please recheck your info."}); 
                    else {
                        return res.json({status:'ok'});
                    }
                }
                
                
            } else{
                
                return res.json({status: 'error', error:"Error occured, user has been registered"});
            }
        } catch(e) {
            console.log(e)
            return res.json({ status: 'error', error: 'Error occured, please recheck your info.' })
        }
    })
    

    
    



}