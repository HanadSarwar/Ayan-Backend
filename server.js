const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());


if (!process.env.MONGO_URL) {
    console.error('MONGO_URL is not defined in your .env file.');
    process.exit(1);
}

const DB_NAME = 'AYAN-COURSE';
const mongoUri = process.env.MONGO_URL;

// Connect with the correct database name and create a simple schema to initialize the database
mongoose.connect(mongoUri, { dbName: DB_NAME })
    .then(async () => {
        console.log(`MongoDB connected to database: ${DB_NAME}`);
        
        // Create a simple schema for initialization
        const Schema = mongoose.Schema;
        const initSchema = new Schema({
            name: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        });

        // This will ensure the database is created
        try {
            const InitModel = mongoose.model('Init', initSchema);
            await InitModel.createCollection();
            console.log('Database and collection initialized successfully');
            // Immediately remove the test collection
            await mongoose.connection.db.dropCollection('inits');
        } catch (err) {
            // Ignore errors as they likely mean the collection already exists
        }
    })
    .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
