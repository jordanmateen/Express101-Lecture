// Requiring libraries and setting constants. 
const express = require('express');
// const bodyParser = require("body-parser");
const es6Renderer = require('express-es6-template-engine');
const swPlanets = require('./starWarsData');
const app = express();
const PORT = 3000;

// Custom middleware. This will execute after every request. 
// if you do not include the next function here the request will hang. 
app.use((req, res, next)=>{
    console.log(`request made in ${req.path}`)
    next()
})
// serve files in the static folder of local host 3000
app.use(express.static(__dirname + '/public'));

// Middleware parsing the url and  body of the request.
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(express.json());

// express-es6-template-engine set up
app.engine('html', es6Renderer); // Registers HTML as the engine (this is what type of view will be rendering. )
app.set('views', 'templates'); // The templates folder is where our "views" will be located. 
app.set('view engine', 'html'); // the engine we set up on line 15 will be used here. 


// ES6 template data is being passed into the html templates via the locals and partials objects
// The locals object carries the data. The partials object is your styling (in this example)
app.get('/starWars', (req, res)=>{
    res.render('index',{
        locals: {
            planets: swPlanets
        },
        partials: {
            bootstrap: './templates/partials/bootstrap.html',
            navbar: './templates/partials/nav.html'
        }
    });
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
        res.render('planet',{
            locals: {
                planet: planet1
            },
            partials: {
                bootstrap: './templates/partials/bootstrap.html',
                navbar: './templates/partials/nav.html'
            }
        })
    }else{
        res.send(`Planet does not exist in collection: ${name}`)
    }
})

// app listens on port 3000 and responds with feedback
app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`)
})