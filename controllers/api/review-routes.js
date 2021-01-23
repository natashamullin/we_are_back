const router = require('express').Router();
const passport = require('passport');
const { Review, User } = require('../../models');

router.get('/', (req, res) => {
    Review.findAll({
        include: [
            {
                model: User
            }
        ]
    })
        .then(dbReviewData => res.json(dbReviewData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User
            }
        ]
    })
        .then(dbReviewData => {
            if (!dbReviewData) {
                res.status(404).json({ message: 'No review found with this id' });
                return;
            }

            const review = dbReviewData.get({ plain: true });

            res.render("single-review", { review });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', passport.authenticate("local"), (req, res) => {
    Review.create({
        title: req.body.title,
        review_body: req.body.review_body,
        user_id: req.user.id
    })
        .then(dbReviewData => res.status(201).json(dbReviewData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    console.log(req.user)
    Review.findByPk(req.params.id)
        .then(review => {
            if (!review) {
                res.status(404);
                return { message: 'No review found with this id' };

            }
            // if (review.user_id !== req.user_id) {
            //     res.status(401);
            //     return { message: 'Not authorized' }
            // }
            return review.update(
                {
                    title: req.body.title,
                    review_body: req.body.review_body
                },
            )
        })
        .then(review => {

            res.json(review)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Review.findByPk(req.params.id)
        .then(review => {
            if (!review) {
                res.status(404);
                return { message: 'No review found with this id' };

            }
            // if (review.user_id !== req.user_id) {
            //     res.status(401);
            //     return { message: 'Not authorized' }
            // }
            return review.destroy()
        })
        .then(error => {
            if (!error) res.sendStatus(204)
            else res.json(error)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;