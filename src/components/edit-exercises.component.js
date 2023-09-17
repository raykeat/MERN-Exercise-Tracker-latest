import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react';

//functional component
function EditExercise () {
    
    //useLocation is used to access the current location and any state or parameters associated with it.
    //useLocation hook to access exercise object passed as a navigation state to "/editpost" route
    const location = useLocation();
    const { exercise } = location.state;

    const [ExerciseState,setExerciseState] = useState(exercise);
    const [Edited,setEdited] = useState(false);
    
    console.log(ExerciseState.date)


    function onChangeUsername(e) {
        setExerciseState(prevdata => ({
            ...prevdata,
            //e.target refers to html element that received the event
            //e.target.value refers to value of that html element that received the event
            username: e.target.value,
        }));
    }

    function onChangeExercisename(e) {
        setExerciseState(prevdata => ({
            ...prevdata,
            exercisename: e.target.value,
        }));
    }

    function onChangeDescription(e) {
        setExerciseState(prevdata => ({
            ...prevdata,
            description: e.target.value,
        }));
    }

    function onChangeDuration(e) {
        setExerciseState(prevdata => ({
            ...prevdata,
            duration: e.target.value,
        }));
    }

    function onChangeDate(date) {
        setExerciseState(prevdata => ({
            ...prevdata,
            date: new Date(date),
        }));
    }

    function onChangeImageurl(e) {
        setExerciseState(prevdata => ({
            ...prevdata,
            imageurl: e.target.value,
        }));
    }

    //event handler/function that is invoked once form is submitted
    function onSubmit(e){

        //prevent normal form submission behaviour
        e.preventDefault();

        const exercise = {
            username: ExerciseState.username,
            exercisename: ExerciseState.exercisename,
            description: ExerciseState.description,
            duration: ExerciseState.duration,
            date: ExerciseState.date,
            imageurl: ExerciseState.imageurl,
            exerciseid: ExerciseState._id,
        }
        console.log(exercise);

        //making axios post request to backend EXPRESS endpoints/routes, which then performs CRUD operations in MongoDB
        axios.post(`http://localhost:5000/exercises/update/${exercise.exerciseid}`,exercise)
            .then(res => {
                console.log(res.data);
                setEdited(true);

                window.location = "/";
            })
            .catch(err=>console.log(err));

    }

    
        return (
            <div className="create-exercise-div">
                <h4>Edit Exercise Log</h4>

                <form onSubmit={onSubmit}>
                    <div className = "form-group">
                        <label> Username: </label>
                        <input onChange={onChangeUsername} 
                                value={exercise.username}
                                required
                                className = "form-control"
                                type="text"
                        /> 
                    </div>

                    <div className = "form-group">
                        <label>Exercise: </label>
                        <input type="text"
                                onChange = {onChangeExercisename}
                                value={ExerciseState.exercisename}
                                required
                                className = "form-control"
                            />
                    </div>

                    <div className = "form-group">
                        <label>Description: </label>
                        <input type="text"
                                onChange={onChangeDescription}
                                value={ExerciseState.description}
                                required
                                className = "form-control"
                            />
                    </div>

                    <div className = "form-group">
                        <label>Duration (minutes): </label>
                        <input type="text"
                                onChange={onChangeDuration}
                                value={ExerciseState.duration}
                                required
                                className = "form-control"
                            />
                    </div>

                    <div className = "form-group">
                        <label>Date: </label>
                        <div className = "form-control">
                            <DatePicker 
                                selected = {new Date(ExerciseState.date)}
                                value = {new Date(ExerciseState.date)}
                                onChange = {onChangeDate}
                            />
                        </div>
                    </div>

                    <div className = "form-group">
                        <label>Link to Image: </label>
                        <input type="text"
                                onChange={onChangeImageurl}
                                value={ExerciseState.imageurl}
                                required
                                className = "form-control"
                            />
                    </div>
                    
                    <br />
                    <div className = "form-group">
                        <input type="submit" value ="Edit Log" className="btn btn-info"/>
                    </div>

                    {Edited?(<h5> Exercise Log Edited</h5>):(
                        <div></div>)}

                </form>
            </div>
        );
    }


export default EditExercise;