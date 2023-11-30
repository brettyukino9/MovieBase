const express = require('express');
const db = require('../DBConnect.js');
const router = express.Router();


module.exports = router;

// Upload new media

// Get Specific Media Info
router.get('/:mediaId', (req, res) => {
    const mediaId = req.params.mediaId;

    const query = "SELECT * FROM Media WHERE mediaId = ?";
    
    db.query(query,[mediaId]).then(results => {
        return res.status(200).json({data: results});
    });
    
});
