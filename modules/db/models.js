var mongoose = require('mongoose');

module.exports = function() {
    var User = mongoose.model('User', require('./user-schema'), 'users');

    var models = {
        User: User
    };

    return models;
};
