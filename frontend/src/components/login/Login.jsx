import React from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {  Navigate } from "react-router-dom";
import * as constants from '../../config/constants'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../js/actions/loginActionCreator';

//Define a Login Component
class Login extends React.Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            authFlag : false,
            message : "",
            signUp : false,
            emailId : "",
            loggedIn : props.loggedIn
        }
        //Bind the handlers to this class
        this.emailIdChangeHandler = this.emailIdChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.messageChangeHandler = this.messageChangeHandler.bind(this);
        this.signUpHandler = this.signUpHandler.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    emailIdChangeHandler = (e) => {
        this.setState({
            emailId : e.target.value
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
    signUpHandler = (e) => {
        this.setState({
            signUp : true
        })
    }

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        
        //prevent page from refresh
        e.preventDefault();
        if (this.validateForm()) {
            const data = {
                emailId : this.state.emailId,
                password : this.state.password
            }
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/login',data)
                .then(response => {
                    console.log("Status Code : ",response.status);
                    if(response.status === 200 && response.data === constants.SUCCESSFUL_LOGIN ){
                        console.log("hello user");
                        this.props.login()
                        this.setState({
                            authFlag : true
                        })
                    }
                    if(response.status === 200 && response.data === constants.INVALID_CREDENTIALS){
                        alert("Please enter valid username and password!");
                        this.setState({
                            authFlag : false,
                            message : "Login failed. Please retry with valid credentials"
                        })
                        window.open('/login','_self');
                    
                        
                    }
                });
        }
        
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Navigate to= "/home"/>
        }
        return(
            <div>
                {redirectVar}
            <div className="container">
                <center>
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>Welcome to Etsy Website</h2>
                            <p>Please enter your Email Id and password</p>
                        </div>
                        
                            <div className="formStyle">
                                <input onChange = {this.emailIdChangeHandler} type="email" className="form-control" name="emailId" placeholder="Email Id"/>
                            </div>
                            <div className="formStyle">
                                <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password"/>
                            </div>
                            <br></br>
                            <button onClick = {this.submitLogin} className="btn btn-primary">Login</button> <br></br><br></br>

                            
                            <a href='/signUp'>
                                <button className="btn btn-primary">Sign Up</button>
                            </a>
                            
                            <div className="formStyle">
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
const mapStateToProps = state => {
    return {loggedIn : state.loggedIn}
} 
const mapDispatchToProps = dispatch => {
    return {
        login : ()=> dispatch(login())
    }
}
//export Login Component
export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Login);