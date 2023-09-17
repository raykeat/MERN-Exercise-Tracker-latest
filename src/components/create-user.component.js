import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


//class based component
export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        //initializing component state in constructor
        this.state = {
            username: '',
            password: '',
            confirmpassword: '',
            passwordmatch: true,
            newusercreated: false,
        }

        //binding event handlers, bind value of this to current component instance
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeUsername(e) {
        this.setState({
            username : e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password : e.target.value
        });
    }

    onChangeConfirmPassword(e) {
        this.setState({
            confirmpassword : e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        //password validation
        if (this.state.password!==this.state.confirmpassword){
            this.setState({
                passwordmatch: false,
            })
            return;
        }

        const user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(user);

        this.setState({
            newusercreated:true
        })

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));
    }


    render() {
        return (
            <div className="create-user-div">
                <h4>Create New User</h4>
                <form onSubmit={this.onSubmit}>

                    <label>Username: </label>
                    <input type="text" 
                           className="form-control" 
                           value={this.state.username}
                           onChange={this.onChangeUsername}
                    />

                    <label>Password: </label>
                    <input type="password" 
                           className="form-control" 
                           value={this.state.password}
                           onChange={this.onChangePassword}
                    />


                    <label>Confirm Password: </label>
                    
                    {!this.state.passwordmatch?(
                    <div>
                        <h3>Error! Passwords do not match</h3>
                    </div>):(
                    <div></div>)}

                    <input type="password" 
                           className="form-control" 
                           value={this.state.confirmpassword}
                           onChange={this.onChangeConfirmPassword}
                    />

                    <br />
                    <input type="submit" value="Create New User" className="btn btn-info" />

                    {this.state.newusercreated?(
                        <h5>New user created</h5>
                    ):(<div></div>
                    )}
                </form>
            </div>

        );
    }
}