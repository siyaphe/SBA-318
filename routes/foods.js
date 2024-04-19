const express = require('express');
const router = express.Router();
const foodsData = require('../data/foods');

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const food = foodsData.find(f => f.id === id);
    if (!food) {
        return res.status(404).json({ error: 'Menu not available' });
    }
    res.json(food);
});

router.get('/', (req, res) => {
    res.json(foodsData);
});

module.exports = router;
