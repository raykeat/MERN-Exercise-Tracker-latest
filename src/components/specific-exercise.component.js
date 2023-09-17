import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './components.css'

function SpecificExercise(){
    const navigate = useNavigate();

    //useLocation is used to access the current location and any state or parameters associated with it.
    //useLocation hook to access exercise object passed as a navigation state to "/specificpost" route
    const location = useLocation();
    const {exercise} = location.state;

    const [Exercise,setExercise] = useState(exercise)

    //function to redirect users to edit post page
    function EditPost(exercise) {
        navigate('editpost/', {state:{exercise}});
    }

    return(
        <div className="card m-2" key={Exercise._id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity:'90%'}}>
                    <div className="">

                        <div>
                            <img style={{height: '50vh', width: '60vw'}} src={Exercise.imageurl} className="img-fluid rounded-start" />
                        </div>

                        <div>
                            <div className="card-body">
                                <h5 className="card-title">{Exercise.exercisename}</h5>
                                <p className="card-text">
                                    {Exercise.description}
                                </p>
                                <p className="card-text">
                                    <small className="text-muted">Posted on {Exercise.date} by {Exercise.username}</small>
                                </p>
                            </div>
                            <div>
                                <button onClick={()=>EditPost(Exercise)} type="button" className="display-btn btn btn-info">Edit Post</button>
                            </div>
            
                        </div>

                    </div>
                </div>
    );

}

export default SpecificExercise;