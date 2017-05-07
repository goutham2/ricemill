'use strict';

const bookshelf = require('../config/bookshelf-instance');
const User = require('./user');

module.exports = bookshelf.Model.extend({
    tableName: 'credits',
    user: function() {
        return this.belongsTo(User);
    }
});