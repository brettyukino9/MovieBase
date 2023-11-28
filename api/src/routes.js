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

// TODO: Add routes for database interactions

module.exports = router;

// Search

// Get all Media Types
router.get('/mediatype', (req, res) => {
    db.query("SELECT * FROM moviebase.mediatype").then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Get all age ratings
router.get('/agerating', (req, res) => {
    db.query("SELECT * FROM moviebase.ageratingtype").then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Get all Languages
router.get('/language', (req, res) => {
    db.query("SELECT * FROM moviebase.language").then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Get all Streaming Services
router.get('/streaming', (req, res) => {
    db.query("SELECT * FROM moviebase.streamingservice").then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Get all Genres
router.get('/genre', (req, res) => {
    db.query("SELECT * FROM moviebase.genre").then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Add to List
router.put('/list/:listId/:mediaId/:userId', (req, res) => {
    const listId = req.params.listId;
    const mediaId = req.params.mediaId;
    const userId = req.params.userId;

    //some sort of user validation?
    const query = "INSERT INTO moviebase.medialist (listId, mediaId) VALUES (?, ?)";
    
    db.query(query,[listId, mediaId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Get all User Lists
router.get('/list/:userId', (req, res) => {
    const userId = req.params.userId;

    //some sort of user validation?
    const query = "SELECT * FROM moviebase.list WHERE userId = ?";
    
    db.query(query,[userId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Get Specific Media Info

// Write a Review

// Get a review

// Edit a review

// Get all reviews for a media

// Upload new media

// Get Profile Info

// Edit First Name

// Edit Last Name

// Edit Email

// Edit Password

// View media list
router.get('/list/:listId/:userId', (req, res) => {
    const listId = req.params.listId;
    const userId = req.params.userId;

    //some sort of user validation?
    const query = "SELECT * FROM moviebase.medialist WHERE listId = ? AND userId = ?";

    db.query(query,[listId, userId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Make new media list
router.post('/list/:userId', (req, res) => {
    const userId = req.params.userId;
    const list = req.body;
    //some sort of user validation?

    // Need to get the name and desc of list from the body
    const query = ""
    
    db.query(query,[listId, mediaId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Remove media from list
router.delete('/list/:listId/:mediaId/:userId', (req, res) => {
    const listId = req.params.listId;
    const mediaId = req.params.mediaId;
    const userId = req.params.userId;

    //some sort of user validation?
    const query = "DELETE FROM moviebase.medialist WHERE listId = ? AND mediaId = ?";
    
    db.query(query,[listId, mediaId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Delete list
router.put('/list/:listId/:mediaId/:userId', (req, res) => {
    const listId = req.params.listId;
    const mediaId = req.params.mediaId;
    const userId = req.params.userId;

    //some sort of user validation?
    const query = "INSERT INTO moviebase.medialist (listId, mediaId) VALUES (?, ?)";
    
    db.query(query,[listId, mediaId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

