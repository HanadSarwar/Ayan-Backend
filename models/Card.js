const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },  
    cardHolderName: {
        type: String,
        required: true
    },
    expiryDate: {
        type: String,   
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    }
}, {timestamps :true});

module.exports = mongoose.model('Card', CardSchema);