const express = require('express');
const db = require('../DBConnect.js');
const router = express.Router();


module.exports = router;

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