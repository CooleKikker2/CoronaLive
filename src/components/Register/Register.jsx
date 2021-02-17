import React from "react";
import firebase from "../../firebase";
import Login from "../Login/Login";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display: this.props.display,
            inputPassword: "",
            inputEmail: "",
            inputCheck: "",
            inputUsername: "",
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showLogin = this.showLogin.bind(this);
        
    }

    registerForm(){
        return(
            <div className="RegisterForm">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="E-mailadres" required="required" onChange={this.handleChange} id="inputEmail"></input>
                    <input type="text" placeholder="Volledige Naam" required="required" onChange={this.handleChange} id="inputUsername"></input>
                    <input type="password" placeholder="Wachtwoord" required="required" onChange={this.handleChange} id="inputPassword"></input>
                    <input type="password" placeholder="Wachtwoord bevestigen" required="required" onChange={this.handleChange} id="inputCheck"></input>
                    <p className="error">{this.state.error}</p>
                    <input type="submit" value="Maak account aan!"></input>
                    <p className="a register" onClick={this.showLogin}>Heb je al een account? Log in!</p>
                </form> 
            </div>
        )
    }

    showLogin(){
        this.setState({display: "Login"});
        this.forceUpdate();
    }

    displayLogin(){
        return(
            <div>
                <Login display="block"></Login>
            </div>
        )
    }

    handleChange(event){
        if(event.target.id === "inputEmail"){
            this.setState({inputEmail: event.target.value})
        }else if(event.target.id === "inputPassword"){
            this.setState({inputPassword: event.target.value})
        }else if(event.target.id === "inputUsername"){
            this.setState({inputUsername: event.target.value})
        }else{
            this.setState({inputCheck: event.target.value})
        }
    }

    handleSubmit(event){
        if(this.state.inputPassword === this.state.inputCheck){
            firebase.auth().createUserWithEmailAndPassword(this.state.inputEmail, this.state.inputCheck)
                .then((userCredential) =>{
                    console.log("OK!");
                    var user = firebase.auth().currentUser;
                    if(user !== null){
                        user.updateProfile({
                            displayName: this.state.inputUsername,
                        }).then(function() {
                            console.log("Alles Goed!")
                            this.state.display = "Login";
                            this.showLogin();
                        }).catch(function(error) {
                            console.log(error);
                        })
                    }else{
                        console.log("Gebruiker niet gevonden!");
                    }
                    
                })
                .catch((dataerror) =>{
                    this.state.error = dataerror.message;
                })
        }else{
            this.setState({error : "De wachtwoorden komen niet overeen! Probeer het nog een keer!"})
        }
        event.preventDefault();
    }

    render(){
        if(this.state.display === "block"){
            return(
                <div className="logindiv">
                    <h1>Registreer op de Corona-Live App!</h1>
                    <p>Maak hier een nieuw account aan.</p>
                    {this.registerForm()}
                    
                </div>
            );
        }else if(this.state.display === "Login"){
            return(
                <div>
                    {this.displayLogin()}
                </div>
            )
        }
        else{  
            return "";
        }
    }
}


export default Register