const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const reviewBoardRoutes = require('./review-dashboard-routes');

router.use('/api', apiRoutes);
router.use('/reviews', reviewBoardRoutes);

router.use(homeRoutes)

router.use((req, res) => {
    console.log("No handler for " + req.originalUrl);
    res.status(404).end();
});

module.exports = router;