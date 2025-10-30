const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const User = require('../models/User');


// Create a new card
router.post('/card-post', async (req, res) => {
    try {
        const { userId, cardNumber, cardHolderName, expiryDate, phonenumber } = req.body;
        const user = await User.findById(userId);
        if (!user) {
             return res.status(404).json({ message: 'User not found' });
         }
        const newCard = new Card({
            user: userId,
            cardNumber,
            cardHolderName,
            expiryDate,
            phonenumber
        });
        const savedCard = await newCard.save();
        res.status(201).json(savedCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;