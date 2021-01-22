const router = require('express').Router();
const sequelize = require('../config/connection');
const { Review, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/leave-a-review', (req, res) => {
    Review.findAll({

    })
        .then(dbReviewData => {
            const reviews = dbReviewData.map(review => review.get({ plain: true }))
                .map(review => ({ ...review, canEdit: review.user_id === req.user_id }));
            res.render('leave-a-review', { reviews, user: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/reviews/edit/:id', (req, res) => {
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
                    user: req.session.user
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
router.get('/reviews', (req, res) => {
    Review.findAll({})
        .then(dbReviewData => {
            const reviews = dbReviewData.map(review => review.get({ plain: true }))
                .map(review => ({ ...review, canEdit: review.user_id === req.user_id }));
            res.render('reviews', { reviews, user: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;