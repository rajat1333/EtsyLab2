import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import * as constants from '../../config/constants'
import { connect } from 'react-redux';
import { signUp } from '../../js/actions/signUpActionCreator';

//Define a Login Component
class SignUp extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            emailId : "",
            authFlag : false,
            message : ""
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailIdChangeHandler = this.emailIdChangeHandler.bind(this);
        this.submit = this.submit.bind(this);
        this.messageChangeHandler = this.messageChangeHandler.bind(this);

    }
    //Call the Will Mount to set the auth Flag to false
    // componentWillMount(){
    //     this.setState({
    //         authFlag : false
    //     })
    // }
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

    //emailId change handler to update state variable with the text entered by the user
    emailIdChangeHandler = (e) => {
        this.setState({
            emailId : e.target.value
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
    submit = (e) => {
        
        //prevent page from refresh
        e.preventDefault();
        if (this.validateForm()) {
            const data = {
                username : this.state.username,
                password : this.state.password,
                emailId : this.state.emailId
            }
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/signUp',data)
                .then(response => {
                    console.log("Status Code : ",response.status);
                    if(response.status === 200 && response.data === constants.USER_CREATED ){
                        console.log("New user created successfully");
                        this.props.signUp()
                        this.setState({
                            authFlag : true
                        })
                        alert("User create successFully")
                        window.open('/login','_self');
                    }
                    if(response.status === 200 && response.data === constants.USER_ALREADY_EXISTS){
                        alert("User name or email id is already taken");
                        this.setState({
                            authFlag : false,
                            message : "User with given email Id already exists"
                        })
                        window.open('/signUp','_self');
                    
                        
                    }
                });
        }
        
    }

    render(){
        //redirect based on successful login
        // let redirectVar = null;
        // if(cookie.load('cookie')){
        //     // redirectVar = <Redirect to= "/home"/>
        // }
        return(
            <div>
                {/* {redirectVar} */}
            <div class="container">
                <center>
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Welcome to Etsy SignUp Page</h2>
                            <p>Please enter your details</p>
                        </div>
                        
                            {/* <div class="formStyle">
                                <input onChange = {this.usernameChangeHandler} type="text" class="form-control" name="username" placeholder="Username"/>
                            </div> */}
                            <div class="formStyle">
                                <input onChange = {this.emailIdChangeHandler} type="email" class="form-control" name="emailId" placeholder="Email Id"/>
                            </div>
                            <div class="formStyle">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            
                            <br></br>
                            <button onClick = {this.submit} class="btn btn-primary">Register User</button> <br></br><br></br>
                            {/* <button onClick = {this.signUpHandler} class="btn btn-primary">Sign Up</button> */}
                            <a href='/login'>
                                <button class="btn btn-primary">Login Page</button>
                            </a>
                                   
                    </div>
                </div>
                </center>
                
            </div>
            </div>
        )
    }
}
//export Login Component
const mapStateToProps = state => {
    return {loggedIn : state.loggedIn}
} 
const mapDispatchToProps = dispatch => {
    return {
        signUp : ()=> dispatch(signUp())
    }
}
//export Login Component
export default connect(
    mapStateToProps,
    mapDispatchToProps
) (SignUp);
