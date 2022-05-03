module.exports = function(app){

const User = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET



    app.post('/login', async (req, res) => {
        const { email, password } = req.body
        const user = await User.findOne({ email }).lean()
        
        if (!user ) {
            
            return res.json({ status: 'error', error: 'Invalid email/password' })
            
        }
        
        if (await bcrypt.compare(password, user.password)) {
            // the email, password combination is successful
            
            const token = jwt.sign(
                {
                    
                    id: user._id,
                    email: user.email
                    
                },
			JWT_SECRET,
                {
                    expiresIn:"40m"
                }
            )
            req.session.token = token;
            return res.json({ status: 'ok', data: token })
            
            
        }

        res.json({ status: 'error', error: 'Invalid email/password' })
})


}