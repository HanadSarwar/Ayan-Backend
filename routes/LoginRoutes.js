const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Login = require('../models/Login');

router.post('/login',async (req , res ) =>{
    try{
        const { email , password } =req.body;
        if(!email || !password){
            return res.status(400).json({ message: 'Email and Password are Required'});
        }

        const user = await User.findOne({ email });

        const loginRecord = new Login({
            user: user ? user._id : null,
            email: email,
            ipAddress: req.socket.remoteAddress || 'unknown',
            userAgent: req.headers['user-agent'] || 'unknown',
            status:'failed'
        });
        if(!user){
            await loginRecord.save();
            return res.status(401).json({ message: 'Invalid Email'});

        }
        const isMatch =await user.comparePassword(password);
        if(!isMatch) {
            await loginRecord.save();
             return res.status(401).json({ message: 'Invalid Email or Password'});
        }
        loginRecord.status = 'success'
        await loginRecord.save();

        res.status(200).json({
            message: 'Login Successfully',
            userId: user._id,
            email: user.email
        });
    }catch (error){
        return res.status(500).json({ message: 'Server error' ,error: error.message });
    }
});
module.exports= router;