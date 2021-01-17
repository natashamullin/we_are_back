const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, } = require('../models');

router.get('/', (req, res) => {
<<<<<<< HEAD
    res.render("body");
=======
    res.render("body", { loggedIn: req.session.loggedIn });
>>>>>>> main
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