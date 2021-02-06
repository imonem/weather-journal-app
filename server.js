// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Require Axios to replace fetch on openweathermap.org API call
const axios = require('axios');


// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//get routes
//return end point data part I
app.get('/getdatafromserver', (req, res) => {
    res.send(projectData);
    // console.log(projectData);
});


//post routes
//save data to server endpoint
app.post('/updateprojectdata', postToServer);

function postToServer(req, res) {
    let newEntry = req.body;
    projectData.date = newEntry.date;
    projectData.temp = newEntry.temp;
    projectData.feelings = newEntry.feelings;
    res.send(projectData);
    console.log(projectData);
}

// Setup Server port at 8000
const port = 8000;

//server startup
/**console message to debug server startup */
const listening = () => {
    console.log(`server is up and running, listening on port ${port}`);
};
const server = app.listen(port, listening);