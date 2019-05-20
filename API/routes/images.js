const express = require('express');
const router = express.Router();

router.use('/', express.static('../storage/'));

module.exports = router;
