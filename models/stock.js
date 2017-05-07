'use strict';

const bookshelf = require('../config/bookshelf-instance');
const User = require('./user');

module.exports = bookshelf.Model.extend({
    tableName: 'stocks',
    user: function() {
        return this.belongsTo(User);
    }
});