// Users ROUTES
const router = require('express').Router();
const hash = require('simple-sha256');

// Models
const User = require('../models/User');
const Products = require('../models/Product');

// Middleware
const isAuth = require('../middleware/isAuth');

// Get user data
router.get('/me', isAuth, (req, res) => {
    res.json(req.user);
});

// Edit user data
router.put('/edit', isAuth, (req, res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            name: req.body.name,
            categories: req.body.categories,
            brands: req.body.brands
        }
    ).then(() => {
        res.json({ msg: 'User updated!' });
    });
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
