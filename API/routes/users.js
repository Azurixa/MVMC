// Users ROUTES
const router = require('express').Router();
const hash = require('simple-sha256');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

// Models
const User = require('../models/User');
const Products = require('../models/Product');

// Middleware
const isAuth = require('../middleware/isAuth');

// Get user data
router.get('/me', isAuth, (req, res) => {
    res.json(req.user);
});

// Find user by email
router.get('/find/:email', isAuth, (req, res) => {
    const email = req.params.email;

    if (email) {
        User.findOne({ email }, ['name', 'photo', '_id', 'email', 'level']).then(
            user => {
                if (user) {
                    res.json(user);
                } else {
                    res.json({ err: 'User with this email does not exitst' });
                }
            }
        );
    }
});

// Find user by ID
router.get('/findID/:id', isAuth, (req, res) => {
    const id = req.params.id;

    if (id) {
        User.findOne({ _id: id }, ['name', 'photo', '_id', 'email', 'level']).then(
            user => {
                if (user) {
                    res.json(user);
                } else {
                    res.json({ err: 'User with this email does not exitst' });
                }
            }
        );
    }
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

// Profile image upload
router.post('/photo', isAuth, (req, res) => {
    if (req.files) {
        const photo = req.files.photo;
        const allowedMimetypes = [
            'image/jpg',
            'image/jpeg',
            'image/png',
            'image/gif'
        ];
        if (allowedMimetypes.includes(photo.mimetype)) {
            const fileName = req.user._id + photo.name;
            photo.mv(path.resolve('./') + '/storage/temp/' + fileName, err => {
                if (err) console.log(err);
                sharp(path.resolve('./') + '/storage/temp/' + fileName)
                    .resize(500)
                    .jpeg()
                    .toFile(
                        path.resolve('./') + '/storage/profile/' + fileName,
                        err => {
                            if (err) console.log(err);

                            fs.unlink(
                                path.resolve('./') +
                                    '/storage/temp/' +
                                    fileName,
                                err => {
                                    if (err) console.log(err);
                                    fs.unlink(
                                        path.resolve('./') +
                                            '/storage/profile/' +
                                            req.user.photo,
                                        err => {
                                            if (err) console.log(err);
                                            User.findByIdAndUpdate(
                                                req.user._id,
                                                {
                                                    photo: fileName
                                                }
                                            ).then(() => {
                                                res.json({
                                                    msg:
                                                        'Photo successfully changed'
                                                });
                                            });
                                        }
                                    );
                                }
                            );
                        }
                    );
            });
        } else {
            res.json({ err: 'File must be allowed type image' });
        }
    }
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
