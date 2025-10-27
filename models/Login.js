const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    email: {
        type: String,
        required: true
    },
    loginTime: {
        type: Date,
        default: Date.now
    },
    ipAddress:{
        type: String
    },
    userAgent:{
        type:String
    },
    status:{
        type:String,
        enum:['success','failed'],
        default:'success'
    }
}, {timestamps :true});
module.exports =mongoose.model('Login',LoginSchema);