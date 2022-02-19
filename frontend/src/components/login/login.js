import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false,
            message : ""
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.messageChangeHandler = this.messageChangeHandler.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    messageChangeHandler = (e) => {
        this.setState({
            message : e.target.value
        })
    }

    validateForm() {
        const inputs = document.querySelectorAll('input');
        const error = document.getElementById('requiredError');
        let isFormValid = true;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value === ""){
                error.textContent = inputs[i].name + " is required field";
                isFormValid = false;
                break;
            }
        }
        return isFormValid;
    }


    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        if (this.validateForm()) {
            const data = {
                username : this.state.username,
                password : this.state.password
            }
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/login',data)
                .then(response => {
                    console.log("Status Code : ",response.status);
                    if(response.status === 200){
                        console.log("hello user");
                        this.setState({
                            authFlag : true
                        })
                    }
                    if(response.data === "Login Failed. Please enter Valid credentials"){
                    
                        
                        alert("Please enter valid username and password!");
                        this.setState({
                            authFlag : false,
                            message : "Login failed. Please retry with valid credentials"
                        })
                        //window.open('/login','_self');
                    
                        
                    }
                });
        }
        
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/home"/>
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                <center>
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Welcome to Etsy Website</h2>
                            <p>Please enter your username and password</p>
                        </div>
                        
                            <div class="formStyle">
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div class="formStyle">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>        
                            <div class="formStyle">
                               {this.state.message}
                            </div>         
                    </div>
                </div>
                </center>
                
            </div>
            </div>
        )
    }
}
//export Login Component
export default Login;