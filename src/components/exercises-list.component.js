import React, { Component } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import "./components.css";
import axios from 'axios';
import EditExercise from "./edit-exercises.component";
import { useNavigate } from 'react-router-dom';



//functional React component
function ExercisesList() {
    const [Exercises, setExercises] = useState([]);

    //React Hooks like useNavigate must be used directly inside a functional component, 
    //cannot be used within nested functions within a functional component
    //useNavigate is used for navigation between routes 
    const navigate = useNavigate();

    //nesting axios get request within useEffect function
    //to get all the exercises saved in MongoDB and render them
    useEffect(() => {

        axios.get('https://mern-exercise-tracker-backend-wxdr.onrender.com/exercises/')
            .then(response => {
                setExercises(response.data);
            })
            .catch(error => {
                console.log('Error: '+ error);
            });

    },[]); //empty dependency array to prevent effect from running indefinitely LOL


    //function to delete post by sending axios delete request to backend Express server
    function DeletePost(exercise_id){
        axios.delete(`https://mern-exercise-tracker-backend-wxdr.onrender.com/exercises/${exercise_id}`)
            .then(response => {
                console.log(response);

                //to get new list of exercises after deleting an exercise
                axios.get('https://mern-exercise-tracker-backend-wxdr.onrender.com/exercises/')
                    .then(response => {
                        setExercises(response.data);
                    })
                    .catch(error => {
                        console.log('Error: '+ error);
                    });

            })
            .catch(error => {
                console.log(error);
            });
    }

    function EditPost(exercise){

        //navigate function from useNavigate is used to navigate to 
        //the "editpost/" route while providing the exercise object as state data when the EditPost function is called
        //"editpost/" route maps to EditExercise component, which is then rendered
        navigate('editpost/', {state:{exercise}});
    }

    function ViewPost(exercise) {
        navigate('specificpost/', {state:{exercise}});
    }

    return (
        <div className="exercise-list-div d-flex" style={{height: '80vh'}}>
            <div className="overflow-auto d-flex flex-column" style={{flex:1}}>

                <div className="card m-2" >
                    <div className="row g-0">
                        <div className="col-md-2">
                            <img style={{height: '30vh', width: '13vw'}} src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain1.webp" className="img-fluid rounded-start"/>
                        </div>
                        <div className="col-md-10">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">
                                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card m-2" >
                    <div className="row g-0">
                        <div className="col-md-2">
                            <img style={{height: '30vh', width: '13vw'}} src="https://mdbcdn.b-cdn.net/img/Photos/Vertical/mountain2.webp" className="img-fluid rounded-start" />
                        </div>
                        <div className="col-md-10">
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">
                                    This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {Exercises && Exercises.map((exercise)=> (

                //unique key prop must be provided to each item when rendering a dynamic list in React
                //as React uses keys to track which elements have been changed, thus allowing efficient updates 
                //of UI when list changes
                <div className="card m-2" key={exercise._id}>
                    <div className="row g-0">

                        <div className="col-md-2">
                            <img style={{height: '30vh', width: '13vw'}} src={exercise.imageurl} className="img-fluid rounded-start" />
                        </div>

                        <div className="col-md-10">
                            <div className="card-body">
                                <h5 className="card-title">{exercise.exercisename}</h5>
                                <p className="card-text">
                                    {exercise.description}
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">Posted on {exercise.date} by {exercise.username}</small>
                                </p>
                            </div>
                            <div>
                                <button onClick={()=>ViewPost(exercise)} type="button" className="display-btn btn btn-info">View Post</button>
                                <button onClick={()=>EditPost(exercise)} type="button" className="display-btn btn btn-info">Edit Post</button>
                                <button onClick={()=>DeletePost(exercise._id)} type="button" className="display-btn btn btn-primary">Delete Post</button>
                            </div>
            
                        </div>

                    </div>
                </div>
            ))}

            </div>
        </div>
    );

}

export default ExercisesList;
    

        
    