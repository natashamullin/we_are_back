const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, } = require('../models');

router.get('/', (req, res) => {
    res.send("hello")
})

router.get('/signUp', (req, res) => {
    res.render('signUp');
});









module.exports = router;