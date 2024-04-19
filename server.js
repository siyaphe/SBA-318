const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
// --------------------------------------------------------------------------[express Application]

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
};
//---------------------------------------------------------------------------[Middleware to log requests]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logRequest); 
//---------------------------------------------------------------------------[Middleware]

//-------------------------------------------- [desserts]
const dessertsRoute = require('./routes/desserts');

app.use('/desserts', dessertsRoute);

let dessertsData = require('./data/desserts');
app.post("/desserts", (req, res) => {
    const newDessert = req.body;
    dessertsData.push(newDessert);
    res.json(newDessert);
});

//---------------------------------------[Post routes for data]


// --------------------------------------------[foods]
const foodsRoute = require('./routes/foods');
app.use('/foods', foodsRoute);

// --------------------------------------------[drinks]
const drinksRoute = require('./routes/drinks');
app.use('/drinks', drinksRoute);



//------------------------------------------------------------------------- [ROUTES]
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'server error' });
});
//--------------------------------------------------------------------------[Error handling middleware]

app.put("/desserts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedDessert = req.body;
    const index = dessertsData.findIndex(dessert => dessert.id === id);
    if (index !== -1) {
        dessertsData[index] = updatedDessert;
        res.json(dessertsData[index]);
    } else {
        res.status(404).json({ error: 'Dessert not found' });
    }
});
//---------------------------------------------[PUT request]
app.delete("/desserts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = dessertsData.findIndex(dessert => dessert.id === id);
    if (index !== -1) {
        const deletedDessert = dessertsData.splice(index, 1);
        res.json({ message: 'Dessert deleted successfully', deletedDessert });
    } else {
        res.status(404).json({ error: 'Dessert not found' });
    }
});


//---------------------------------------------[Delete route]


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//-------------------------------------------------------------------------[Server Listening]