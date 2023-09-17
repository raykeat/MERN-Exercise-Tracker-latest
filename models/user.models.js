//import the mongoose library
const mongoose = require('mongoose')

//defining a user schema using the 'mongoose.Schema' constructor
//schema is a blueprint that defines structure of documents stored in a MongoDB collection
//The first set of curly braces is for defining individual fields, 
//and the second set is for specifying schema-level options.

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

//creates a mongoose model named 'User' based on the user schema
//model is an instances of documents based on the schema
const User = mongoose.model('User',userSchema);

//exporting model so it can be used in other parts of the application
module.exports = User;