require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes/router');
const { connectToDB } = require('./db/connect');
const { initilizingPassport } = require('./middlewares/middleware');

app.use(cors());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, 'public')));

connectToDB();
initilizingPassport(passport);

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
