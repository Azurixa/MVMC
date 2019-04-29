// Index ROUTES
const router = require('express').Router();

// Users routes
router.use('/users', require('./users'));

// Auth routes
router.use('/auth', require('./auth'));

// Products routes
router.use('/products', require('./products'));

router.get('/', (req, res) => {
    res.json({ msg: 'Welcome to API!' });
});

module.exports = router;
