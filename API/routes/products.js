const router = require('express').Router();

// Models
const Product = require('../models/Product');
const User = require('../models/User');

// Middleware
const isAuth = require('../middleware/isAuth');

// Get user all products
router.get('/my', isAuth, (req, res) => {
    const allProducts = [];

    User.findById(req.user._id, ['categories'], {
        sort: { categories: 1 }
    }).then(user => {
        user.categories.forEach(category => {
            Product.find({ user_id: req.user._id, category }, [], {
                sort: { brand: 1 }
            }).then(products => {
                allProducts.push({
                    category,
                    products
                });
            });
        });
        res.json(allProducts);
    });
});

module.exports = router;
