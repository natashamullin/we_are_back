const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, } = require('../models');

router.get('/', (req, res) => {
    console.log({
        session: req.session,
        user: req.user
    });
    res.render("body", { user: req.user });
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

router.get('/review', (req, res) => {
    console.log({
        session: req.session,
        user: req.user
    });
    res.render('single-review', { user: req.user });
});







module.exports = router;