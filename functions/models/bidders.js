const mongoose = require('mongoose');

const bidder = new mongoose.Schema({
    carId:{
        type: String,
        require : true
    },
    userId:{
        type: String,
        require: true
    },
    firstname:{
        type: String,
        require : true
    },
    lastname:{
        type: String,
        require : true
    },
    time :{
        type: Date,
        default: Date()
    },
    price : {
        type : String,
        required : true
    },
  
})

const model = mongoose.model('bidder', bidder)

module.exports = model