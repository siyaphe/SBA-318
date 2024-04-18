const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const PORT = process.env.PORT || 5000
// ------------------------------------------express Application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//-------------------------------------------[Middleware]
const dessertsData = require('./data/desserts');
const foodsData = require('./data/foods');
const drinksData = require('./data/drinks');

// ------------------------------------------[Data]
app.get("/desserts/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const dessert = dessertsData.find(d => d.id === id);
    if (!dessert) {
        return res.status(404).json({error:'Dessert not available'})
    }
    res.json(dessert)
});

// ------------------------------------------[GET Index]

app.get("/desserts",(req, res)=>{
    res.json(dessertsData);
});


// ----------------------------------------------[Desserts]

app.get("/foods/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const food = foodsData.find(f => f.id === id);
    if (!food) {
        return res.status(404).json({error:'Menu not available'})
    }
    res.json(food)
});

app.get("/foods",(req, res)=>{
    res.json(foodsData);
});

// ----------------------------------------------[Foods]
app.get("/drinks/:id", (req, res) =>{
    const id = parseInt(req.params.id);
    const drink = drinksData.find(dr => dr.id === id);
    if (!drink) {
        return res.status(404).json({error:'Please, order another drink!'})
    }
    res.json(drink)
});

app.get("/drinks",(req, res)=>{
    res.json(drinksData);
});

// ----------------------------------------------[Drinks]

// -----------------------------------------------------------------------------[GET All]



// ------------------------------------------[Routes]


app.listen(PORT, ()=>{
    console.log(`Server Listening on Port: ${PORT}`);
});
// ------------------------------------------[Server Listening]