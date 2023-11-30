const express = require('express');
const db = require('../DBConnect.js');
const router = express.Router();


module.exports = router;

// View all media in a list
router.get('/media/:listId/', (req, res) => {
    const listId = req.params.listId;

    //some sort of user validation?
    const query = "SELECT * FROM MediaList WHERE ListId = ?";

    db.query(query,[listId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Get info about a user list
router.get('/:listId/', (req, res) => {
    const listId = req.params.listId;

    const query = "SELECT * FROM List WHERE ListId = ?";

    db.query(query,[listId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Make new media list
router.post('/:userId', (req, res) => {
    const userId = req.params.userId;
    const list = req.body;
    //some sort of user validation?

    const query = "INSERT INTO List (Name, Description, UserId) VALUES (?, ?, ?)";
    
    db.query(query,[list.name,list.description, userId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Add media to a list
router.post('/:listId/:mediaId', (req, res) => {
    const listId = req.params.listId;
    const mediaId = req.params.mediaId;

    const query = "INSERT INTO MediaList (ListId, MediaId) VALUES (?, ?)";
    
    db.query(query,[listId, mediaId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Remove media from list
router.delete('/:listId/:mediaId', (req, res) => {
    const listId = req.params.listId;
    const mediaId = req.params.mediaId;

    const query = "DELETE FROM MediaList WHERE ListId = ? AND MediaId = ?";
    
    db.query(query,[listId, mediaId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});

// Delete list
router.put('/:listId', (req, res) => {
    const listId = req.params.listId;

    //some sort of user validation?
    const query = "DELETE FROM List WHERE ListId = ?";
    
    db.query(query,[listId, mediaId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});