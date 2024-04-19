const express = require('express');
const router = express.Router();
const drinksData = require('../data/drinks');

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const drink = drinksData.find(dr => dr.id === id);
    if (!drink) {
        return res.status(404).json({ error: 'Please, order another drink!' });
    }
    res.json(drink);
});

router.get('/', (req, res) => {
    res.json(drinksData);
});

module.exports = router;
