const mongoose = require('mongoose');
const image = require('./image');
const Q_A = require("./Q_A")

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

const car = new mongoose.Schema({
    userId: {
        type: String,
        default: 'not yet'
    },
    carProp:{
        type: carProp
    },
    arrayOfImage : {
        type: Array,
        default: []
    },
    startTime : {
        type: Date,
        default: new Date(new Date().getTime()+ 1000*60*60*24*7)
    },
    isApproved:{
        type : Boolean,
        default: true
    },
    isExpired:{
        type : Boolean,
        default: false
    },
    lastId:{
        type : String,
        default: 'No one bid yet'
    },
    lastPrice:{
        type : String,
        default: 0
    },
    auction:{
        type : Array,
        default: []
    },
    arrayOfQ_A:{
        type: Array,
        default : []
    }
})

module.exports = UploadModel = mongoose.model('Cars', car);