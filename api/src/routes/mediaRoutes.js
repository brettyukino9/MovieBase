const express = require('express');
const db = require('../DBConnect.js');
const router = express.Router();


module.exports = router;

// Upload new media
router.put('/', (req, res) => {
    const media = req.body;

    const query = "INSERT INTO Media (Title, Description, ReleaseDate, RunTime, Poster, MediaTypeId, PublisherId, LanguageId, AgeRatingId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    db.query(query,[media.title, media.description, media.releaseDate, media.runTime, media.poster, media.mediaType, media.publisher, media.language, media.ageRating]).then(results => {
        return res.status(200).json({data: results});
    });    

});

// Get Specific Media Info
router.get('/:mediaId', (req, res) => {
    const mediaId = req.params.mediaId;

    const query = "SELECT * FROM Media WHERE mediaId = ?";
    
    db.query(query,[mediaId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});
