module.exports = function(app){

    const Contact = require('../models/contact.js')

    
    app.post('/contact', async (req, res) => {
        const { First_Name,
			Last_Name,
			Subject,
			Email,
			Message } = req.body

        try {
            const response = await Contact.create({
                First_Name : First_Name,
                Last_Name : Last_Name,
                Email : Email,
                Subject : Subject,
                Message : Message
            })
            // console.log('User created successfully: ', response)
        } catch (error) {
            if (error.code === 11000) {
                // duplicate key
                return res.json({ status: 'error', error: 'Connection is busy, please try again later' })
            }
            throw error
        }
        
        res.json({ status: 'ok' })
    })
}