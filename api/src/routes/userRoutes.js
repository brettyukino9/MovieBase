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

    if(req.body.email.indexOf('@') === -1 || req.body.email.indexOf('.') === -1) {
        return res.status(400).json({success: false, error: "Please enter a valid email"});
    }

    if(req.body.password.length > 100) {
        return res.status(400).json({success: false, error: "Please make password less than 100 characters"});
    }

    db.query("CALL CreateUser(?, ?, ?, ?)", [req.body.firstName, req.body.lastName, req.body.email, req.body.password]).then(results => {
        return res.status(200).json({success: true});
    });
});

/**
 * API Method for logging in to the system
 */
router.post('/login', async (req, res) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({success: false, error: "Missing data"});
    }

    if(req.body.email.indexOf('@') === -1 || req.body.email.indexOf('.') === -1 || req.body.password.length > 100) {
        return res.status(400).json({success: false, error: "Invalid email or password"});
    }

    db.query("SET @isVerifiedUser = FALSE; CALL VerifyUser(?, ?, @isVerifiedUser); SELECT @isVerifiedUser;", [req.body.email, req.body.password]).then(results => {
        if(results[0]) {
            db.query("SELECT * FROM User WHERE email = ?", [req.body.email]).then(results => {
                startSession(req, res, results[0]);
                return res.status(200).json({success: true});
            });
        } else {
            return res.status(400).json({success: false, error: "Invalid email or password"});
        }

    });

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
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    
    const query = "SELECT * FROM User WHERE userId = ?";

    // TO DO: Implement security measures

    db.query(query,[userId]).then(results => {
        let user = results.results[0]
        let data = {
            UserId: user.UserId,
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
        }
        return res.status(200).json(JSON.stringify(data));
    });
    
});

// Edit First Name 
router.put('/firstName/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = req.body;

    const query = "UPDATE User SET firstName = ? WHERE userId = ?";

    db.query(query,[user.firstName, userId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Edit Last Name
router.put('/lastName/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = req.body;

    const query = "UPDATE User SET lastName = ? WHERE userId = ?";

    db.query(query,[user.lastName, userId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Edit Email
router.put('/email/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = req.body;

    const query = "UPDATE User SET email = ? WHERE userId = ?";

    db.query(query,[user.email, userId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Edit Password
router.put('/password/:userId', (req, res) => {
    const userId = req.params.userId;
    const user = req.body;

    const query = "UPDATE User SET password = ? WHERE userId = ?";

    db.query(query,[user.password, userId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});


