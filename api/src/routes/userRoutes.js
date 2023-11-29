const express = require('express');
const db = require('../DBConnect.js');
const router = express.Router();

const {checkSession, stopSession, startSession} = require('../token.js');

module.exports = router;

// Create user vaildates the data and returns a success boolean
router.post('/createAccount', async (req,res) => {
    if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
        return res.status(400).json({success: false, error: "Missing data"});
    }

    if(req.body.email.indexOf('@') === -1 && req.body.email.indexOf('.') === -1) {
        return res.status(400).json({success: false, error: "Please enter a valid email"});
    }

    if(req.body.password.length > 100) {
        return res.status(400).json({success: false, error: "Please make password less than 100 characters"});
    }

    db.query("INSERT INTO User (firstName, lastName, email, password) VALUES (?, ?, ?, ?)", [req.body.firstName, req.body.lastName, req.body.email, req.body.password]).then(results => {
        return res.status(200).json({success: true});
    });
});

/**
 * API Method for logging in to the system
 */
router.post('/login', async (req, res) => {
    user = db.query("SELECT * FROM User WHERE email = ? AND password = ?", [req.body.email, req.body.password]);
    if(user.length === 0) {
        return res.status(400).json({success: false, error: "Invalid email or password"});
    }

    startSession(req, res, user[0]);    
    res.json({success: true});
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


// Get Profile Info
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const query = "SELECT * FROM moviebase.user WHERE userId = ?";

    db.query(query,[userId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Edit User Credentials - I think we can do these in one call hopefully 
router.put('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = req.body;
    //some sort of user validation?
    const query = "UPDATE moviebase.user SET firstName = ?, lastName = ?, email = ?, password = ? WHERE userId = ?";

    db.query(query,[user.firstName, user.lastName, user.password, userId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Edit Last Name?

// Edit Email?

// Edit Password?



