const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        console.log('VERIFYING WITH SECRET:', process.env.JWT_SECRET); // Debug line
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (err) {
        console.error('JWT Error:', err.message); // Debug line
        res.status(401).json({ message: 'Token invalid, authorization denied' });
    }
};

module.exports = auth;


