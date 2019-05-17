const router = require('express').Router();
const path = require('path');

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

router.post('/photo', isAuth, (req, res) => {
    const id = req.body._id;
    if (id) {
        Product.findOne({ user_id: req.user._id, _id: id }).then(product => {
            if (product) {
                if (req.files) {
                    const photo = req.files.photo;

                    const allowedMimetypes = [
                        'image/jpg',
                        'image/jpeg',
                        'image/png',
                        'image/gif'
                    ];

                    if (allowedMimetypes.includes(photo.mimetype)) {
                        const fileName = req.user._id + product._id + photo.name
                        photo.mv(path.resolve('./') + '/storage/' + fileName);
                        product.photos.push(
                            {
                                src: fileName
                            }
                        );
                        product.save((err) => {
                            if (err) {
                                console.log(err);
                            }
                            res.json({ msg: 'Successfully uploaded a photo' });
                        });
                    } else {
                        res.json({ err: 'File must be a allowed image type' });
                    }
                } else {
                    res.json({ err: 'You need to send photo' });
                }
            } else {
                res.json({ err: 'Product with this ID does not exist' });
            }
        });
    } else {
        res.json({ err: 'You need to provide product id' });
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
