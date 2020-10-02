const {
    verifyToken
} = require('../services/token.service');


const checkAuthToken =  async (req, res, next) => {
    try {
        // console.log(1111, req.userId);
        const token = req.get('Authorization');
        if(!token) {
            return res.status(401).send('No token')
        };
    
        const data = await verifyToken(token);
        // req.

    } catch (err) {
        res.status(401).send('Invalid token');
    }
};

module.exports = {
    checkAuthToken,
};