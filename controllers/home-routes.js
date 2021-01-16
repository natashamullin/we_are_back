const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, } = require('../models');

router.get('/', (req, res) => {
    res.render("main");
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signUp', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signUp');
});









module.exports = router;