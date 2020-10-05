const {
    verifyToken
} = require('../services/token.service');


const checkAuthTokenMiddleware =  async (req, res, next) => {

    // const token = req.get('Authorization');
    // console.log(1111, token);

    try {
        // console.log(1111, req.userId);
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