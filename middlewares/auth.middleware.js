const {
    verifyToken
} = require('../services/token.service');


const checkAuthTokenMiddleware =  async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        if(!token) {
            return res.status(401).send('No token')
        };
        const data = await verifyToken(token);
        req.userId = data.id;
        next();

    } catch (err) {
        res.status(401).send('Invalid token');
    }
};

module.exports = {
    checkAuthTokenMiddleware,
};