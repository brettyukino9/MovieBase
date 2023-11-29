const express = require('express');
const db = require('../DBConnect.js');
const router = express.Router();


module.exports = router;

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