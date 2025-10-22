const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			return res.status(400).json({ message: 'All fields are required.' });
		}

		// Check if user already exists
		const existingUser = await User.findOne({ $or: [{ email }, { username }] });
		if (existingUser) {
			return res.status(409).json({ message: 'Username or email already exists.' });
		}

		
		// Create new user
		const newUser = new User({ username, email, password });
		await newUser.save();

		res.status(201).json({ message: 'User registered successfully.' });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error: error.message });
	}
});

module.exports = router;

