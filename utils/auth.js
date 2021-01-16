const withAuth = (req, res, next) => {
    if (!req.session.user1_id) {
        res.redirect('/signUp');
    } else {
        next();
    }
};









module.exports = withAuth