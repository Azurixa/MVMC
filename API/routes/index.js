const router = require('express').Router();

router.get('/', (req, res) => {
    res.json({ msg: 'Welcome to API!' });
});

module.exports = router;
