'use strict';

const express = require('express');
const User = require('../models/user');
const jwtAuth = require('../middlewares/jwt-authenticate');
const router = express.Router();
const Stock = require('../models/stock');

router.post('/', jwtAuth, function (req, res) {
    Stock.forge({
        user_id: req.user.attributes.id,
        mills_id: req.body.mills_id,
        name: req.body.name,
        stock: req.body.stock,
        date: req.body.date
    }).save().then(res.json({
        success: true
    })).catch(function (err) {
        res.status(400).json({
            success: false
        })
    });
});

router.put('/:id', jwtAuth, function (req, res) {
    new Stock({
        id: parseInt(req.params.id)
    }).save(req.body).then(res.json({
        success: true
    })).catch(res.status(400).json({
        success: false
    }));
})

router.get('/', jwtAuth, function (req, res) {
    new Stock().where({
        user_id: req.user.attributes.id
    }).fetchAll().then(function (stocks) {
        res.json({
            success: true,
            data: stocks
        });
    }).catch(res.status(400).json({
        success: false
    }));
});

router.get('/:id', jwtAuth, function (req, res) {
    new Stock().where({
        id: parseInt(req.params.id)
    }).fetchAll().then(function (stocks) {
        res.json({
            success: true,
            data: stocks
        });
    }).catch(res.status(400).json({
        success: false
    }));
});

router.post('/search', jwtAuth, function (req, res) {
    var searchObject = Object.assign({}, {
        user_id: req.user.attributes.id
    }, req.body);
    new Stock().where(searchObject).fetchAll().then(function (stocks) {
        res.json({
            success: true,
            data: stocks
        });
    }).catch(res.status(400).json({
        success: false
    }));
});

module.exports = router;