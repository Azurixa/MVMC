// Users ROUTES
const router = require('express').Router();
const hash = require('simple-sha256');

// Models
const User = require('../models/User');

// Middleware
const isAuth = require('../middleware/isAuth');

// Get user data
router.get('/me', isAuth, (req, res) => {
    res.json(req.user);
});

// User register
router.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if (name && email && password) {
        hash(password).then(hashed => {
            User.create({ name, email, password: hashed }).then(user => {
                res.json(user);
            });
        });
    } else {
        res.json({ err: 'All fields are required!' });
    }
});

module.exports = router;
