'use strict';

const express = require('express');
const User = require('../models/user');
const jwtAuth = require('../middlewares/jwt-authenticate');
const router = express.Router();
const Credit = require('../models/credit');

router.post('/', jwtAuth, function (req, res) {
    Credit.forge({
        user_id: req.user.attributes.id,
        mills_id: req.body.mills_id,
        name: req.body.name,
        balance: req.body.balance,
        date: req.body.date
    }).save().then(res.json({
        success: true
    })).catch(function (err) {
        res.json({
            success: false
        })
    })
});

router.put('/:id', jwtAuth, function (req, res) {
    new Credit({
        id: parseInt(req.params.id)
    }).save(req.body).then(res.json({
        success: true
    })).catch(res.status(400).json({
        success: false
    }));
})

router.get('/', jwtAuth, function (req, res) {
    new Credit().where({
        user_id: req.user.attributes.id
    }).fetchAll().then(function (Credits) {
        res.json({
            success: true,
            data: Credits
        });
    }).catch(res.status(400).json({
        success: false
    }));
});

router.get('/:id', jwtAuth, function (req, res) {
    new Credit().where({
        id: parseInt(req.params.id)
    }).fetchAll().then(function (Credits) {
        res.json({
            success: true,
            data: Credits
        });
    }).catch(res.status(400).json({
        success: false
    }));;
});

router.post('/search', jwtAuth, function (req, res) {
    var searchObject = Object.assign({}, {
        user_id: req.user.attributes.id
    }, req.body);
    new Credit().where(searchObject).fetchAll().then(function (Credits) {
        res.json({
            success: true,
            data: Credits
        });
    }).catch(res.status(400).json({
        success: false
    }));
});

module.exports = router;