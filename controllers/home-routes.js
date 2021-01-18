const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, } = require('../models');

router.get('/', (req, res) => {
    res.render("body", {
        user: req.user,
        loggedIn: req.session.loggedIn
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});









module.exports = router;