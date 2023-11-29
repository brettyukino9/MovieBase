const express = require('express');
const db = require('../DBConnect.js');
const router = express.Router();


module.exports = router;


// Search

// Get all Media Types
router.get('/mediatype', (req, res) => {
    db.query("SELECT * FROM MediaType").then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Get all age ratings
router.get('/agerating', (req, res) => {
    db.query("SELECT * FROM AgeRatingType").then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Get all Languages
router.get('/language', (req, res) => {
    db.query("SELECT * FROM Language").then(results => {
        return res.status(200).json({data: results});
    });
    
});







// Get all Streaming Services
router.get('/streaming', (req, res) => {
    db.query("SELECT * FROM StreamingService").then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Get all Genres
router.get('/genre', (req, res) => {
    db.query("SELECT * FROM Genre").then(results => {
        return res.status(200).json({data: results});
    });
    
});