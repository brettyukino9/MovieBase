const express = require('express');
const tokenParse = require('cookie-parser');
const router = express.Router("/api");
const db = require('./DBConnect.js');
router.use(express.static('static'));
router.use(express.urlencoded({extended: true}));
router.use(tokenParse());
router.use(express.json());

const {checkSession, stopSession, startSession} = require('./token.js');

// Create user vaildates the data and returns a success boolean
router.post('/createAccount', async (req,res) => {
    
});

/**
 * API Method for logging in to the system
 */
router.post('/login', async (req, res) => {
    
});

/**
 * Method logs the user out of the application
 */
router.post('/logout', (req, res) => {
    stopSession(req, res);
    res.json({success: true});
});

/**
 * Route checks the user token and returns the data stored in the token
 */
router.get('/getCurrentUser', checkSession, (req, res) => {
    return res.status(200).json(req.user);
});

router.get('/test', (req, res) => {
    db.query("SELECT * FROM CastCrew").then(results => {
        return res.status(200).json({data: results});
    });
    
});

// TODO: Add routes for database interactions

module.exports = router;
