const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const handlebars = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;
app.engine("handlebars", handlebars());
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now Listening'));
});