const express = require('express');
const bodyParser = require("body-parser");
const es6Renderer = require('express-es6-template-engine');
const app = express();
const PORT = 3000;

// serve files in the static folder of local host 3000
app.use(express.static(__dirname + '/public'));

// Middleware parsing the body of the request.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express-es6-template-engine set up
app.engine('html', es6Renderer); // Registers HTML as the engine (this is what type of view will be rendering. )
app.set('views', 'templates'); // The templates folder is where our "views" will be located. 
app.set('view engine', 'html'); // the engine we set up on line 15 will be used here. 

// get route, home route (this page will be served using line 8)
app.get('/', (req, res)=>{
    res.send('Hello World, How are you today?');
})

// get route, home route using es6 template  (this page will be served using the es 6 temolate setup line 15-17)
app.get('/home', (req, res)=>{
    res.render('home', {
        locals: {
            title: "Home Page",
            description: "A blank canvas depicts a white rabbit in a snowstorm. Now that's art!!!"
        }
    });
})

//get route
app.get('/data', (req, res)=>{
    res.send({data: 'data'})
})

// post route
app.post('/post', (req, res)=> {
    res.json(req.body)
})

// app listens on port 3000 and responds with feedback
app.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`)
})