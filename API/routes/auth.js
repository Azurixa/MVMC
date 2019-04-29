// Auth ROUTES
const router = require('express').Router();
const hash = require('simple-sha256');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt_config');

// Models
const User = require('../models/User');

// Token distribution
router.post('/token', (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        hash(password).then(hashed => {
            User.findOne({ email, password: hashed }, ['_id']).then(user => {
                if (user) {
                    jwt.sign(
                        { _id: user._id },
                        jwtConfig.SECRET,
                        {
                            expiresIn: '7d'
                        },
                        (err, token) => {
                            if (err) console.log(err);
                            res.json({ token_type: 'Bearer', token });
                        }
                    );
                } else {
                    res.json({ err: 'Bad credentials!' });
                }
            });
        });
    } else {
        res.json({ err: 'All fields are required!' });
    }
});

module.exports = router;
