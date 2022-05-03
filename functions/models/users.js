
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');


var UserSchema = new mongoose.Schema(
	{
		firstname: {type: String, required: true},
		lastname: {type: String,required: true},
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phone: {type: String, default: ''},
		zip: {type: String, default: ''},
		OmiId : {type: String, default: ''},
		isBuyable: {type: Boolean, default: false},
		bids: { type: Array, default: []},
		
		carsWon: { type: Array, default:[]},
		
		
		
		
	},
	{ collection: 'users' }
)

UserSchema.methods.encryptPW = async function(password){
	return await bcrypt.hash(password, 10);
}
UserSchema.methods.validPW = async function(password){
	return await bcrypt.compare(password, this.password);
}


const model = mongoose.model('UserSchema', UserSchema)

module.exports = model


