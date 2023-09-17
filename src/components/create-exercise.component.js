import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//class based component
export default class CreateExercise extends Component {
    //constructor is a special method of class
    //that gets called when an object of the class is created
    //can initialize component's state and bind event handlers in constructor
    constructor(props) {
        super(props);

        this.state = {
            username: 'ray',
            exercisename: '',
            description: '',
            duration: 0,
            date: new Date(),
            imageurl: '',
            users: [],
            newexercisecreated: false,
        }

        //binding event handlers
        //binds the value of this to current component instance
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeExercisename = this.onChangeExercisename.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeImageurl = this.onChangeImageurl.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //Both the constructor and componentDidMount are lifecycle methods in React, but they serve different purposes and 
    //are used at different stages of a component's life cycle.
    //constructor is called when instance of component is created but hasn't rendered for first time
    //componentDidMount is called immediately after component has rendered for the first time
    componentDidMount(){
        axios.get('http://localhost:5000/users/')
            .then(response => {

                if (response.data.length>0){
                    this.setState({

                        users: response.data.map((user)=>user.username)
                    })
                }
            })
            .catch(err=>console.log(err));
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeExercisename(e) {
        this.setState({
            exercisename: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onChangeImageurl(e) {
        this.setState({
            imageurl: e.target.value
        })
    }

    //event handler/function that is invoked once form is submitted
    onSubmit(e){
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            exercisename: this.state.exercisename,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
            imageurl: this.state.imageurl,
        }
        console.log(exercise);



        //making axios post request to backend EXPRESS endpoints/routes, which then performs CRUD operations in MongoDB
        axios.post('http://localhost:5000/exercises/add',exercise)
            .then(res => {
                console.log(res.data);
                this.setState({
                    newexercisecreated: true
                });

                window.location = "/";
            })
            .catch(err=>console.log(err));

    }

    render() {
        return (
            <div className="create-exercise-div">
                <h4>Create New Exercise Log</h4>

                <form onSubmit={this.onSubmit}>
                    <div className = "form-group">
                        <label> Username: </label>
                        <select onChange={this.onChangeUsername} 
                                value={this.state.username}
                                required
                                className = "form-control"
                        > 
                            {this.state.users.map((user) => {
                                return <option key={user._id}>{user}</option>;
                            })}
                        
                        </select>
                    </div>

                    <div className = "form-group">
                        <label>Exercise: </label>
                        <input type="text"
                                onChange = {this.onChangeExercisename}
                                value={this.state.exercisename}
                                required
                                className = "form-control"
                            />
                    </div>

                    <div className = "form-group">
                        <label>Description: </label>
                        <input type="text"
                                onChange={this.onChangeDescription}
                                value={this.state.description}
                                required
                                className = "form-control"
                            />
                    </div>

                    <div className = "form-group">
                        <label>Duration (minutes): </label>
                        <input type="text"
                                onChange={this.onChangeDuration}
                                value={this.state.duration}
                                required
                                className = "form-control"
                            />
                    </div>

                    <div className = "form-group">
                        <label>Date: </label>
                        <div className = "form-control">
                            <DatePicker 
                                selected = {this.state.date}
                                onChange = {this.onChangeDate}
                            />
                        </div>
                    </div>

                    <div className = "form-group">
                        <label>Link to Image: </label>
                        <input type="text"
                                onChange={this.onChangeImageurl}
                                value={this.state.imageurl}
                                required
                                className = "form-control"
                            />
                    </div>
                    
                    <br />
                    <div className = "form-group">
                        <input type="submit" value ="Create New Log" className="btn btn-info"/>
                    </div>

                    {this.state.newexercisecreated?(<h5> New Exercise Created</h5>):(
                        <div></div>)}

                </form>
            </div>
        );
    }
}