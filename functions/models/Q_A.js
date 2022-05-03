const mongoose = require('mongoose');

const Q_A = new mongoose.Schema({
    question : {
        type : String,
        required : true
    },
    answer : {
        type: String,
        default: ''
    },
    isAns :{
        type: Boolean,
        default: false
    },
    username:{
        type: String,
        required: true
    }
})

const model = mongoose.model('Q_A', Q_A)

module.exports = model