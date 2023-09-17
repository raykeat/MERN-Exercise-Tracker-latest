//SETTING UP ROUTES/URL PATHS TO PERFORM CRUD OPERATIONS FOR USERS

//creating an instance of an Express router using the express.Router() function. 
const router = require('express').Router();
//importing the User model from the '../models/user.models' path.
let User = require('../models/user.models');


//default route
router.route('/').get((req,res) => {
    //uses the Mongoose find() method to query the MongoDB database for all documents (records) in the "User" collection/model
    User.find()
        //if database query is successful, it will send a 'users' array as a JSON response to the client
        //MongoDB automatically generates collection names based on the pluralized and lowercase form of the model name.
        //hencewhy 'users' is the collection name for all the users
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: '+ err));
});


//route to add new users
router.route('/add').post((req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({username,password});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

//route to remove new users - incomplete
router.route('/remove').post((req,res) => {
    const username = req.body.username;
})

//exporting the router
module.exports = router;

