//import the mongoose library
const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    exercisename: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    imageurl: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Exercise',exerciseSchema);

module.exports = Exercise;