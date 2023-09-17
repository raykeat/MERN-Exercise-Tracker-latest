//importing various libraries to set up Express.js application, handle cross-origin resource sharing (CORS), and interact with MongoDB, respectively.
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//using the dotenv library to load environment variables from a .env file 
require('dotenv').config();

//creates an instance of the Express application. 
//The app variable will be used to define routes, middleware, 
//and other settings for Express app.
const app = express();
//sets the port number that your Express app will listen on. It checks if there's a PORT environment variable defined, and if not, it defaults to port 5000.
const port = process.env.PORT || 5000;

//tells express app to use cors middleware and the built-in express.json() middleware
app.use(cors());
app.use(express.json());
//"middleware" are functions executed in between receiving an incoming HTTP request 
//and sending the response. These functions can modify the request or response, 
//perform tasks, or enforce security checks, eg perform logging and authentication

//process.env is an object in Node.js that provides access to environment variables. 
const uri = process.env.ATLAS_URI;
//uses the mongoose library to connect to the MongoDB database using the connection string stored in the uri variable.
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
//event listener for when the MongoDB connection is established, to log a message
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!!");
})


//Setting up routes for express.js server
//importing router modules (javascript files that define routes and handle HTTP requests)
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
//app.use() method of Express to mount the imported router modules/javascript files onto specific routes.
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});