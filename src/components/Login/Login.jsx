import React from "react";
import firebase from "../../firebase";
import Register from "../Register/Register";
import Map from "../Map/map";
import cookie from 'react-cookies';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputUsername: '',
            inputPassword: '',
            loggedIn: false,
            error: "",
            display: "block",
        }

        this.changeVisible = this.changeVisible.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showRegister = this.showRegister.bind(this);
            
        this.state.display = this.props.display;

        if(cookie.load('logged')){
            this.state.display = "map";
            this.forceUpdate();
        }

    }


    

    showRegister(){
        this.setState({display: "Register"});
        this.forceUpdate();
    }

    loginForm(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="inputUsername" value={this.state.inputUsername} onChange={this.handleChange} placeholder="E-mailadres"/>
                    <input type="password" id="inputPassword" placeholder="Wachtwoord" value={this.state.inputPassword} onChange={this.handleChange}/><br />
                    <p className="error">{this.state.error}</p>
                    <input type="submit" value="Log in!"></input>
                </form>
                <p className="a register" onClick={this.showRegister}>Nog geen account? Registreer hier!</p>
            </div>
        )
    }

    displayRegister(){
        return(
            <div>
                <Register display="block"></Register>
            </div>
        )
    }

    displayMap(){
        return(
            <div>
                <Map></Map>
            </div>
        )
    }

    

    handleChange(event){
        if(event.target.id === "inputUsername"){
            this.setState({inputUsername: event.target.value})
        }else if(event.target.id === "inputPassword"){
            this.setState({inputPassword: event.target.value})
        }
    }

    handleSubmit(event){
        firebase.auth().signInWithEmailAndPassword(this.state.inputUsername, this.state.inputPassword)
            .then((userCredential) =>{
                this.setState({loggedIn: true})
                this.setState({display: "map"})
                cookie.save('logged', userCredential.user , { path: '/' });
                this.forceUpdate();
            })
            .catch((error) => {
                this.setState({error: "Het inloggen is mislukt! Heb je de goede gegevens gebruikt?"});
            })
        event.preventDefault();
    }

    changeVisible(){
        if(this.state.display === "none"){
            this.setState({display: "block"})
        }else{
            this.setState({display: "none"})
        }
        this.forceUpdate();
    }
    
    render() {
        if(this.state.display === "block"){
            return(
                <div className="logindiv">
                    <h1>Welkom bij de Corona-Live App!</h1>
                    <p>Log in of maak een nieuw account om verder te gaan.</p>
                    {this.loginForm()}
                    
                </div>
            );
        }else if(this.state.display === "Register"){
            return(
                <div>
                    {this.displayRegister()}
                </div>
            )
        }else if(this.state.display === "map"){
            return(
                <div>
                    {this.displayMap()}
                </div>
            )
        }
        else{
            return("");
        }
    }
}

export default Login;