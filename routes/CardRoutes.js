const express = require('express');
const router = express.Router();
const Card = require('../models/Card');
const User = require('../models/User');
const auth = require('../middleware/auth');


// Create a new card (protected)
router.post('/card-post', auth, async (req, res) => {
    try {
        const { cardNumber, cardHolderName, expiryDate, phonenumber } = req.body;
        const userId = req.user && req.user.id;
        if (!userId) return res.status(401).json({ message: 'User must be logged in to add a card' });

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
//get Card details
router.get('/card-get/:id', async (req, res) => {
    try {
        const card = await Card.findById(req.params.id); 
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json(card);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// update card details
router.put('/card-update/:id', async (req, res) => {
    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json(updatedCard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//delete card
router.delete('/card-delete/:id', async (req, res) => {
    try {
        const deletedCard = await Card.findByIdAndDelete(req.params.id);
        if (!deletedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }
        res.json({ message: 'Card deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;