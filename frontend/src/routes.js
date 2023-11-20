// Necessary imports
const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Set the paths for the static resources and templates
routes.use(express.static(__dirname));
const path = require('path');
const html_dir = path.join(__dirname, './templates/');

// Parsers for cookies and body text
routes.use(cookieParser());
routes.use(bodyParser.urlencoded({ extended: false}));

// Define the routes for the frontend pages here
routes.get('/', (req, res) => {
    res.sendFile(`${html_dir}splashpage.html`);
});

routes.get('/signin', (req, res) => {
    res.sendFile(`${html_dir}signin.html`);
});

routes.get('/signup', (req, res) => {
    res.sendFile(`${html_dir}signup.html`);
});

// Export this code to be used for other scripts
module.exports = routes;