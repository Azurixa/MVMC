const User = require('../models/User.js');

module.exports = addExp = (_id, ammount) => {
    User.findOne({ _id }).then(user => {
        user.exp += ammount;
        if (user.exp > user.exp_next) {
            user.level++;
            user.exp_next += 350;
        }
        user.save().then(user => {
            return 'OK!';
        });
    });
};
