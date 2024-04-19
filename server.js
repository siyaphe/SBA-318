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
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//-------------------------------------------------------------------------[Server Listening]