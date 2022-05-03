module.exports = function(app){
    const User = require('../models/users.js')

    const sendEmail = require("./sendEmail")
    const bcrypt = require('bcryptjs')
    const jwt = require('jsonwebtoken')
    const JWT_SECRET = process.env.JWT_SECRET



    app.post('/sent-reset', async(req,res) => {
        try{

                const { email} = req.body;
                const user = await User.findOne({ email }).lean()
                
                if (!user) {
                    
                    return res.json({ status: 'error', error: 'Please enter your email.' })
                }
            
            
            
                const token = jwt.sign(
                        {
                            id: user._id,
                            email: user.email                           
                        },
                        JWT_SECRET,
                        {expiresIn:"5m"}
                        )
                    
                

                const link = `<p>Please click the link to reset your password</p>
                <p>The link will expires in 5 minutes</p>
                        <a href = "`+process.env.HOST+`/password-reset?id=${user._id}&token=${token}" > This link </a>`;
                        await sendEmail(user.email, "Password reset", link);
                        res.json({status:'ok' });    
            } catch {
                res.json({ status: 'error', error: 'Error occured, please enter your email again' })
            }
    })







}