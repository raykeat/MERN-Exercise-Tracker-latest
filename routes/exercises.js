//setting up API endpoint route so that server can perform CRUD operations
//SETTING UP ROUTES/URL PATHS TO PERFORM CRUD OPERATIONS FOR EXERCISES


//creating an instance of an Express router using the express.Router() function. 
const router = require('express').Router();
//importing the Exercise model from the '../models/exercises.models' path.
let Exercise = require('../models/exercises.models');
let User = require('../models/user.models');


//default route to get all exercises
router.route('/').get((req,res) => {
    //uses the Mongoose find() method to query the MongoDB database for all documents (records) in the "Exercise" collection/model
    //find() method will return an array of documents from a collection
    Exercise.find()
        //if database query is successful, it will send a 'exercises' array as a JSON response to the client
        //MongoDB automatically generates collection names based on the pluralized and lowercase form of the model name.
        //hencewhy 'exercises' is the collection name for all the exercises
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: '+ err));
});

//route to add new exercises
router.route('/add').post((req,res) => {

    const username = req.body.username;
    const exercisename = req.body.exercisename;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const imageurl = req.body.imageurl;

    const newExercise = new Exercise({username, exercisename, description, duration, date, imageurl});

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

//In Express.js, /:id is a route parameter, req.params.id is used to access the value of the id parameter from the URL, 
//and req.body.id is used to access the value of the id property in the request body.
//route to get specific exercise by its id (get request)
router.route('/:id').get((req,res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: '+ err));
})

//route to delete specific exercise by its id (delete request)
router.route('/:id').delete((req,res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise successfully deleted!'))
        .catch(err => res.status(400).json('Error: '+ err));
})

//route to update specific exercise
router.route('/update/:id').post((req,res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.exercisename = req.body.exercisename;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);
            exercise.imageurl = req.body.imageurl;

            exercise.save()
                .then(() => res.json('Exercise updated'))
                .catch(err => res.status(400).json('Error: '+ err));
        })

        .catch(err => res.status(400).json('Error: '+ err));
})


//sample route to add new exercises by matching user's object id
router.route('/addsample').post(async (req,res) => {

    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const user = await User.findOne({username}).exec();
    if (!user) {
        return res.status(400).json('User not found');
    }
    const userid = user._id
    const newExercise = new Exercise({user: userid, description, duration, date});

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: '+ err));
});


//exporting the router
module.exports = router;