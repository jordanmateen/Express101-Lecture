// Requiring libraries and setting constants. 
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const swPlanets = require('./starWarsData');
const app = express();
const PORT = 3000;

// serve files in the static folder of local host 3000
app.use(express.static(__dirname + '/public'));

// Middleware parsing the body of the request.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ejs views set up
app.set('views', path.join(__dirname, 'templates')); // The templates folder is where our "views" will be located. 
app.set('view engine', 'ejs'); // the engine we set up on line 15 will be used here. 



app.get('/starWars', (req, res)=>{
    res.render('pages/index', { planets: swPlanets });
})

// getting all the data fro references. 
app.get('/starWarsAll', (req, res)=>{
    res.send(swPlanets);
})

// This route utilizes a parameter denoted by the :param syntax. 
// This parameters value will be located in the req.params object on the request.
// ex: starWars/Tatooine --> req.params = Tatooine
app.get('/starWars/:name', (req, res)=>{
    const {name} = req.params

    const planet1 = swPlanets.find(planet => planet.name === name)
    if(planet1){
        res.render('pages/planet',{ planet: planet1})
    }else{
        res.send(`Planet does not exist in collection: ${name}`)
    }
})

// app listens on port 3000 and responds with feedback
app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`)
})

