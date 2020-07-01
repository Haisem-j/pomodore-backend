const jwt = require('jsonwebtoken');


function verify(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('access denied')
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.username = verified;
        next();
    } catch (error) {
        res.status(401).send('invalid token')
    }
}

module.exports = verify;