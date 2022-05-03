module.exports = function(app){

    const User = require('../models/users.js')
    const bcrypt = require('bcryptjs')

    const validateEmail = (email) => {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    
    


    
    
    
    app.post('/register', async (req, res) => {
        const { firstname, lastname, email, password: plainTextPassword, confirmpw } = req.body

        if (!email || typeof email !== 'string' || email == '') {
            return res.json({ status: 'error', error: 'Invalid email' })
        }
        if(!validateEmail(email)){
            return res.json({ status:'error', error:'Please enter email in correct pattern'})
        }
        
    

        if (!plainTextPassword || typeof plainTextPassword !== 'string') {
            return res.json({ status: 'error', error: 'Invalid password' })
        }

        if(plainTextPassword !== confirmpw){
            return res.json({ status: 'error', error: 'Confirm password doesn\'t match' })
        }
        
        if (plainTextPassword.length < 5) {
            return res.json({
                
                status: 'error',
                error: 'Password too small. Should be atleast 6 characters.'
                
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
        
        const password = await bcrypt.hash(plainTextPassword, 10)

        try {
            const response = await User.create({
                firstname,
                lastname,
                email,
                password
            })
            console.log('User created successfully: ', response)
        } catch (error) {
            if (error.code === 11000) {
                // duplicate key
                return res.json({ status: 'error', error: 'email already in use' })
            }
            throw error
        }
        
        res.json({ status: 'ok' })
    })
}