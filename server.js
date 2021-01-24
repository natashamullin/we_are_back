// <!-- heroku : https://dry-mountain-60898.herokuapp.com/ | https://git.heroku.com/dry-mountain-60898.git -->

const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const handlebars = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require('./config/passport');


const PORT = process.env.PORT || 3001;

const app = express();


app.engine("handlebars", handlebars());
app.set('view engine', 'handlebars',);
app.set("port", PORT);
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

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});

// $('#exampleModal').on('show.bs.modal', function (event) {
//     var button = $(event.relatedTarget) // Button that triggered the modal
//     var recipient = button.data('whatever') // Extract info from data-* attributes
//     // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//     // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//     var modal = $(this)
//     modal.find('.modal-title').text('New message to ' + recipient)
//     modal.find('.modal-body input').val(recipient)
//   })