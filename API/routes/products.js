const router = require('express').Router();

// Models
const Product = require('../models/Product');
const User = require('../models/User');

// Middleware
const isAuth = require('../middleware/isAuth');

// Create new product
router.post('/new', isAuth, (req, res) => {
    const { name, brand, category, description, first_impressions } = req.body;

    if (name && brand && category) {
        Product.create({
            user_id: req.user._id,
            name,
            brand,
            category,
            description,
            first_impressions
        }).then(product => {
            res.json(product);
        });
    } else {
        res.json({
            err: 'All required fileds must be provided'
        });
    }
});

// Get user all products
router.get('/my', isAuth, (req, res) => {
    const allProducts = [];

    req.user.categories.forEach((category, index) => {
        Product.find({ user_id: req.user._id, category }, [], {
            sort: { brand: 1 }
        }).then(products => {
            allProducts.push({
                category,
                products
            });
            if (index == req.user.categories.length - 1) {
                res.json(allProducts);
            }
        });
    });
});

module.exports = router;
