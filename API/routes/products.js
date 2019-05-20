const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// Models
const Product = require('../models/Product');
const User = require('../models/User');

// Middleware
const isAuth = require('../middleware/isAuth');

// Create new product
router.post('/new', isAuth, (req, res) => {
    const {
        name,
        brand,
        category,
        description,
        first_impressions,
        pans_all
    } = req.body;

    if (name && brand && category) {
        Product.create({
            user_id: req.user._id,
            name,
            brand,
            category,
            description,
            first_impressions,
            pans: {
                done: 0,
                all: pans_all
            }
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
        Product.findOne({ user_id: req.user._id, _id: id }, { user_id: 0 })
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

router.delete('/photo', isAuth, (req, res) => {
    const _id = req.body._id;
    const photos = req.body.photos;
    const photoName = req.body.photoName;

    if (_id) {
        Product.findOne({ user_id: req.user._id, _id }, err => {
            if (err) {
                res.json({ err: 'Product does not exist' });
            } else {
                fs.unlink(path.resolve('./') + '/storage/' + photoName, err => {
                    if (err) {
                        res.json({ err: 'Photo does not exist' });
                    } else {
                        res.json({ msg: 'Photo successfully deleted' });
                    }
                });
            }
        });
    } else {
        res.json({ err: 'Product id is required' });
    }
});

// Get user all products
router.get('/my', isAuth, (req, res) => {
    const allProducts = [];

    let counter = 0;
    req.user.categories.forEach(function(category) {
        Product.find({ user_id: req.user._id, category }, [], {
            sort: { brand: 1 }
        }).then(function(products) {
            allProducts.push({
                category,
                products
            });
            counter++;
            if (counter == req.user.categories.length) {
                allProducts.sort(compare);
                res.json(allProducts);
            }
        });
    });
});

function compare(a, b) {
    if (a.category > b.category) {
        return 1;
    }
    if (a.category < b.category) {
        return -1;
    }
    return 0;
}

module.exports = router;
