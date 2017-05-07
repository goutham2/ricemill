'use strict';

const express = require('express');
const jwt = require('jwt-simple');
const Promise = require('bluebird');
const User = require('../models/user');
const securityConfig = require('../config/security-config');
const router = express.Router();

router.post('/register', function (req, res) {
    console.log(req.body);
    User.forge(req.body).save()
        .then(res.json({
            sucess: true
        }))
        .catch(function (err) {
            console.log(err);
            res.json({
                sucess: false
            })
        });
});

router.post('/login', function (req, res) {
    const phone_number = req.body.phone_number,
        password = req.body.password;
    Promise.coroutine(function* () {
        const user = yield User.where('phone_number', phone_number).fetch();
        if (!user){
            res.json({success:false,message:'User detail not found'})
        }
        const isValidPassword = yield user.validPassword(password);
        if (isValidPassword) {
            const token = jwt.encode(user.omit('password'), securityConfig.jwtSecret);
            res.json({
                success: true,
                token: `JWT ${token}`
            });

        } else {
            res.status(401).json({
                success: false,
                message: 'Auth Failed'
            });
        }
    })().catch(err => console.log(err));
});

module.exports = router;