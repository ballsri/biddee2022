const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema(
	{
		First_Name: {type: String, required: true},
		Last_Name: {type: String, required: true},
		Email: {type: String, required: true},
		Subject: {type: String, required: true},
		Message: {type: String, required: true}
	},
	{ collection: 'Contact_Us' }
)
const model = mongoose.model('ContactSchema', ContactSchema)

module.exports = model