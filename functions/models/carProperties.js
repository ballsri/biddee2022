const mongoose = require('mongoose');

const carProp = new mongoose.Schema({
    make : {
        type : String,
        required : true
    },
    model : {
        type: String,
        required : true
    },
    year : {
        type : String,
        required: true
    },
    vinNumber:{
        type : String,
        required: true
    },
    engineSize:{
        type : String,
        required: true
    },
    transmission:{
        type : String,
        required: true
    },
    milage:{
        type : String,
        required: true
    },
    regisYear:{
        type : String,
        required: true
    },
    color:{
        type : String,
        required: true
    },
    modifyList:{
        type : String,
        required: true
    },
    location:{
        type : String,
        required: true
    },
    openPrice:{
        type : String,
        required: true
    },
    description:{
        type : String,
        default:'',
        require:true
    }
})

const model = mongoose.model('carProp', carProp)

module.exports = model