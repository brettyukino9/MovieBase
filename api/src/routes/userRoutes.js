const express = require('express');
<<<<<<< HEAD:api/src/routes/userRoutes.js
const router = express.Router();

const {checkSession, stopSession, startSession} = require('../token.js');
=======
const tokenParse = require('cookie-parser');
const router = express.Router("/api");
const db = require('./DBConnect.js');
router.use(express.static('static'));
router.use(express.urlencoded({extended: true}));
router.use(tokenParse());
router.use(express.json());

const {checkSession, stopSession, startSession} = require('./token.js');
>>>>>>> nbthomas_backend_routes_implementation:api/src/routes.js

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
router.get('/list/:mediaId', (req, res) => {
    const mediaId = req.params.mediaId;

    const query = "SELECT * FROM moviebase.media WHERE mediaId = ?";
    
    db.query(query,[mediaId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Write a Review
router.post('/review/:userId/:mediaId', (req, res) => {
    const userId = req.params.userId;
    const mediaId = req.params.mediaId;
    const review = req.body;
    const ratingId = -1;

    const rating_query = "INSERT INTO moviebase.rating (score, userId, mediaId) VALUES (?, ?, ?) RETURNING *";
    db.query(rating_query,[review.score, userId, mediaId]).then(results => {
        ratingId = results[0].ratingId;
        // Not sure if you can get the ratingId from this
    });

    const query = "INSERT INTO moviebase.review (PublicPrivate, Description, userRatingId) VALUES (?, ?, ?)";
    db.query(query,[review.publicPrivate, review.description, ratingId ]).then(results => {
        return res.status(200).json({data: results});
    });
});

// Get a review
router.put('/review/:userId/:mediaId', (req, res) => {
    const userId = req.params.userId;
    const mediaId = req.params.mediaId;

    const query = "SELECT * FROM moviebase.review WHERE userId = ? AND mediaId = ?";
    db.query(query,[userId, mediaId]).then(results => {
        return res.status(200).json({data: results});
    });
});

// Edit a review
router.put('/review/:userId/:mediaId', (req, res) => {
    const review = req.body;
    const get_review_query = "SELECT * FROM moviebase.review WHERE userId = ? AND mediaId = ?";
    const reviewId = -1;
    db.query(get_review_query,[userId, mediaId]).then(results => {
        reviewId = results[0].userRatingId;
        if(results[0].score != review.score){
            const score_query = "UPDATE moviebase.media SET score = ? WHERE mediaId = ?";
            db.query(score_query,[review.score, results[0].mediaId]).then(results => {
                // Do something with the results
            });
        }
    });
    const query = "UPDATE moviebase.review SET PublicPrivate = ?, Description = ? WHERE userRatingId = ?";

    db.query(query,[review.publicPrivate, review.description, review.ratingId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Get all reviews for a media
router.get('/review/:mediaId', (req, res) => {
    const mediaId = req.params.mediaId;
    const query = "SELECT * FROM moviebase.review WHERE mediaId = ?";

    db.query(query,[mediaId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Upload new media

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

    const query = "INSERT INTO moviebase.list (name, description, userId) VALUES (?, ?, ?)";
    
    db.query(query,[list.name,list.description, userId]).then(results => {
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

