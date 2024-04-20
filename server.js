const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
// ---------------------------------------------[express Application]

const logReq = (req, res, next) => {
    console.log(` ${req.method} ${req.url}`);
    next();
};
// ---------------------------Middleware to log requests

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logReq);

//-------------------------- Middleware - parse JSON bodies

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.engine('ejs', require('express'));
//--------------------- [view engine - directory for views]

const dessertsRoute = require('./routes/desserts');
const foodsRoute = require('./routes/foods');
const drinksRoute = require('./routes/drinks');
//----------------------------------[Importing route handlers]

app.use('/desserts', dessertsRoute);
app.use('/foods', foodsRoute);
app.use('/drinks', drinksRoute);
//------------------- [Routes for desserts, foods, and drinks]

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error' });
});
//-------------------------- [Errorhandling middleware]


app.get('/desserts', (req, res) => {
    res.render('desserts');
});
//-------------------------------- [Route desserts view]

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//------------------------------------------ [ server listening]