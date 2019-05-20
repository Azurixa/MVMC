// Index ROUTES
const express = require('express');
const router = require('express').Router();

// Api welcome
router.get('/', (req, res) => {
    res.json({ msg: 'Welcome to MVMC - CRUD API' });
});

// Users routes
router.use('/users', require('./users'));

// Auth routes
router.use('/auth', require('./auth'));

// Products routes
router.use('/products', require('./products'));

module.exports = router;
