// <!-- heroku : https://dry-mountain-60898.herokuapp.com/ | https://git.heroku.com/dry-mountain-60898.git -->

const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const handlebars = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", handlebars());
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(express.static("public"))
app.use(session({
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

sequelize.sync({ force: true }).then(() => {
    app.listen(process.env.PORT || 3000, function () {
        console.log("Now listening ", this.address().port, app.settings.env);
    });
});