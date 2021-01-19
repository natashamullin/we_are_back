const router = require('express').Router();
const sequelize = require('../config/connection');
const { Review, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    Review.findAll({
        // where: {
        //     user_id: req.session.user_id
        // },
        // include: [
        //     {
        //         model: User
        //     }
        // ]
    })
        .then(dbReviewData => {
            const reviews = dbReviewData.map(review => review.get({ plain: true }));
            res.render('reviews-dashboard.handlebars', { reviews, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(dbReviewData => {
            if (dbReviewData) {
                const review = dbReviewData.get({ plain: true });

                res.render('edit-review.handlebars', {
                    review,
                    loggedIn: req.session.loggedIn
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;