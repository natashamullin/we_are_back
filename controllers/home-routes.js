const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, } = require('../models');


router.get('/signUp', (req, res) => {
    res.render('signUp');
});









module.exports = router;