const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

routes.use(express.static(__dirname));
const path = require('path');
const html_dir = path.join(__dirname, './templates/');

routes.use(cookieParser());
routes.use(bodyParser.urlencoded({ extended: false}));

routes.get('/', (req, res) => {
    res.sendFile(`${html_dir}splashpage.html`);
});

routes.get('/signin', (req, res) => {
    res.sendFile(`${html_dir}signin.html`);
});

routes.get('/signup', (req, res) => {
    res.sendFile(`${html_dir}signup.html`);
});

module.exports = routes;