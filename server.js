const express = require('express');
// const bodyParser = require('body-parser');
const app = express();

const dessertsRoute = require('./routes/desserts');
const foodsRoute = require('./routes/foods');
const drinksRoute = require('./routes/drinks');
const desserts = require('./data/desserts');
//----------------------------------[Importing route handlers]
// let {desserts} = require('./da?ta')

const PORT = process.env.PORT || 5000;
// ---------------------------------------------[express Application]

app.use(express.static('public'));
//-------------------------------------Static and middleware

app.use(express.urlencoded({ extended: false }));
//--------------------------------------[Parse Data]

app.use(express.json());
//---------------------------------------[Middleware - parse JSON]

const logReq = (req, res, next) => {
    console.log(` ${req.method} ${req.url}`);
    next();
};
// ---------------------------Middleware to log requests

app.use(logReq);
//--------------------------  bodies

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('ejs', require('express'));

//--------------------- [view engine - directory for views]



app.use('/api/desserts', dessertsRoute);
app.use('/api/foods', foodsRoute);
app.use('/api/drinks', drinksRoute);
//------------------- [Routes for desserts, foods, and drinks]

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Server error' });
});
//-------------------------- [Errorhandling middleware]


app.get('api/desserts', (req, res) => {
    res.render('desserts');
});
//-----------------------------------------------[GET request.]

app.post('api/desserts/', (req, res) => {
    const { name } = req.body
    if (!name) {
      return res
        .status(400)
        .json({ success: false, msg: 'please provide name value' })
    }
    res.status(201).json({ success: true, data: [...desserts,name]})
  })
//-----------------------------------------------[POST request.]

  app.put('/api/desserts/:id', (req, res) => {
    const { id } = req.params
    const { name } = req.body
  
    const dessert = desserts.find((d) => d.id === Number(id))
  
    if (!desserts) {
      return res
        .status(404)
        .json({ success: false, msg: `no person with id ${id}` })
    }
    const dessertsRoute = desserts.map((dessert) => {
      if (dessert.id === Number(id)) {
        dessert.name = name
      }
      return dessert
    })
    res.status(200).json({ success: true, data:dessertsRoute})
  })
//-----------------------------------------------[PUT request.]

  app.delete('/api/desserts/:id', (req, res) => {
    const dessert = desserts.find((d) => d.id === Number(req.params.id))
    if (!desserts) {
      return res
        .status(404)
        .json({ success: false, msg: `no dessert with id ${req.params.id}` })
    }
    const dessertsRoute = desserts.filter(
      (dessert) => dessert.id !== Number(req.params.id)
    )
    return res.status(200).json({ success: true, data:dessertsRoute})
  });
//-----------------------------------------------[DELETE request.]
//------------------------------------------------ [Route desserts view]

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//------------------------------------------ [ server listening]