const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt_config');

// Models
const User = require('../models/User');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        const tokenSplit = token.split(' ');
        if (tokenSplit.length == 2) {
            const tokenToCheck = tokenSplit[1];
            jwt.verify(tokenToCheck, jwtConfig.SECRET, (err, data) => {
                if (err) {
                    res.json({ err: 'Token is invalid!' });
                } else {
                    User.findById(data._id, [
                        'name',
                        'email',
                        'exp',
                        'exp_next',
                        'level',
                        '_id',
                        'categories',
                        'brands'
                    ]).then(user => {
                        req.user = user;
                        next();
                    });
                }
            });
        } else {
            res.json({ err: 'Token in bad format!' });
        }
    } else {
        res.json({ err: 'You need to provide auth token header!' });
    }
};
