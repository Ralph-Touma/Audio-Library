const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; 
        const decodedToken = jwt.verify(token, config.jwtSecret);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed!" });
    }
};
