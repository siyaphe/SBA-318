const express = require('express');
const router = express.Router();
const dessertsData = require('../data/desserts');

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const dessert = dessertsData.find(d => d.id === id);
    if (!dessert) {
        return res.status(404).json({ error: 'Dessert not available' });
    }
     res.json(dessert);
    
});

router.get('/', (req, res) => {
    res.json(dessertsData); 
});

module.exports = router;


