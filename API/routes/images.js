const express = require('express');
const router = express.router;

router.use('/', express.static('../storage/'));

module.exports = router;
