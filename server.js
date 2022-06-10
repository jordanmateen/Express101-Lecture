const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

// serve files in the static folder of local host 3000
app.use(express.static(__dirname + '/public'));

// Middleware parsing the body of the request.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get route. Home route
app.get('/', (req, res)=>{
    res.send('hello world, How are you today?');
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