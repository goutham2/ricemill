'use strict';

const bookshelf = require('../config/bookshelf-instance');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt'));
const securityConfig = require('../config/security-config');
const Stock = require('./stock');
const Credit = require('./credit');

module.exports = bookshelf.Model.extend({
    tableName: 'users',
    hasTimeStamps: true,
    validPassword(password) {
        return bcrypt.compareAsync(password, this.attributes.password);
    },
    initialize() {
        this.on('saving', model => {
            if (!model.hasChanged('password')) return;
            //console.log(bioTrackUsers.fetchAll());
            return Promise.coroutine(function* () {
                const salt = yield bcrypt.genSaltAsync(securityConfig.saltRounds);
                const hashedPassword = yield bcrypt.hashAsync(model.attributes.password, salt);
                model.set('password', hashedPassword);
            })();
        });

    },
    stocks: function(){
        return this.hasMany(Stock);
    },
    credits: function(){
        return this.hasMany(Credit);
    }
});