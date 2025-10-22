const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRoutes = require('./routes/UserRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// User registration routes
app.use('/api/users', UserRoutes);

// MongoDB connection
if (!process.env.MONGO_URL) {
	console.error('MONGO_URL is not defined in your .env file.');
	process.exit(1);
}
const mongoUri = (process.env.MONGO_URL.endsWith('/')
	? process.env.MONGO_URL + process.env.DB_NAME
	: process.env.MONGO_URL + '/' + process.env.DB_NAME);

mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
