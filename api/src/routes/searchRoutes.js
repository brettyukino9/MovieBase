const express = require('express');
const db = require('../DBConnect.js');
const router = express.Router();


module.exports = router;


// Search
<<<<<<< HEAD
router.get('/search', (req, res) => {
    const title = req.body.title;
    const desc =  req.body.desc
    const mediaType = req.body.mediaType;
    const publisher = req.body.publisher;
    const staff = req.body.staff;
    const runtimeMin = req.body.runtimeMin;
    const runtimeMax = req.body.runtimeMax;
    const year = req.body.year;
    const ageRating = req.body.ageRating;
    const language = req.body.language;
    const streamingService = req.body.streamingService;
    const genre = req.body.genre;

    const query = "SELECT * FROM Media WHERE Title LIKE ? AND Description LIKE ?";

    db.query(query,['%'+title+'%', '%'+desc+'%']).then(results => {
        return res.status(200).json({data: results});
    });
    
});

//Get all Media
router.get('/media', (res) => {
    db.query("SELECT * FROM Media").then(results => {
        return res.status(200).json({data: results});
    });
})
=======
>>>>>>> development

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