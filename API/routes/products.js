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

// Get specific product info
router.get('/product/:id', isAuth, (req, res) => {
    const id = req.params.id;

    if (id) {
        Product.findOne({ user_id: req.user._id, _id: id }, {user_id: 0})
            .then(product => {
                res.json(product);
            })
            .catch(() => {
                res.json({ err: 'Invalid product ID' });
            });
    } else {
        res.json({ err: 'You need to provide product ID' });
    }
});

// Edit product by sending PRODUCT object
router.put('/edit', isAuth, (req, res) => {
    const product = req.body.product;
    if (product) {
        Product.findOneAndUpdate(
            { _id: product._id },
            {
                status: product.status,
                description: product.description,
                first_impressions: product.first_impressions,
                rating: product.rating,
                thumbnail: product.thumbnail,
                uses_count: product.uses_count,
                bought_at: product.bought_at,
                expire_months: product.expire_months,
                pans: product.pans,
                name: product.name,
                brand: product.brand,
                category: product.category,
                photos: product.photos
            }
        ).then(() => {
            res.json({ msg: 'Product successfully updated' });
        });
    } else {
        res.json({ err: 'You need to send updated product informations' });
    }
});

// Add photo to product
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
                        const fileName =
                            req.user._id + product._id + photo.name;
                        photo.mv(path.resolve('./') + '/storage/' + fileName);
                        product.photos.push({
                            src: fileName
                        });
                        product.save(err => {
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
