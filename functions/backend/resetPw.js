
module.exports = function(app){

    const User = require('../models/users.js')
    const bcrypt = require('bcryptjs')
    const jwt = require('jsonwebtoken')
    const JWT_SECRET = process.env.JWT_SECRET
    
    
    
    app.post('/password-reset', async (req, res) => {
        
        const { userId , newpassword: plainTextPassword , confirmpw} = req.body;
    
        // console.log(req.body);
        
       
        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
            return res.json({ status: 'error', error: 'Invalid password' })
        }

        if(plainTextPassword !== confirmpw){
            return res.json({ status: 'error', error: 'Confirm password doesn\'t match' })
        }
        
        if (plainTextPassword.length < 6) {
            return res.json({
                status: 'error',
                error: 'Password too small. Should be atleast 6 characters'
            })
        }
        if (plainTextPassword.search(/[a-z]/i) < 0) {
            return res.json({
                status: 'error',
                error:("Your password must contain at least one letter.")
            })
        }
        if (plainTextPassword.search(/[0-9]/) < 0) {
            return res.json({
                status : 'error',
                error:("Your password must contain at least one digit.")
                
            })
        }
        if (plainTextPassword.search(/[A-Z]/i) < 0) {
            return res.json({
                status: 'error',
                error:("Your password must contain at least one capitalized letter.")
            })
        }
        
        try {
            const _id = userId;
         
            const password = await bcrypt.hash(plainTextPassword, 10)
            
            await User.updateOne(
                { _id },
                {
                    $set: { password }
                }
            )
            res.json({ status: 'ok' })
        } catch (error) {
            console.log(error)
            res.json({ status: 'error', error: 'Error occured, please try again' })
        }
    })
}