const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

module.exports = function (req, res, next) {
    try {
        //step 1: Take Token from the Header
        const authHeader = req.headers['authorization'] || req.headers['Authorization'];
        if (!authHeader) return res.status(401).json({ message: 'No token provided' });

       //    STep 2: split the token
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ message: 'Invalid authorization format' });
        }

        //step3 : store the headerToken in the token 

        const token = parts[1];
        const payload = jwt.verify(token, JWT_SECRET);

        // Attach user info to request
        req.user = { id: payload.id, email: payload.email };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token', error: err.message });
    }
};
