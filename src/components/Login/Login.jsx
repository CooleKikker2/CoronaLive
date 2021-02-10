import React from "react";
import firebase from "../../firebase";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputUsername: '',
            inputPassword: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loginForm(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="inputUsername" value={this.state.inputUsername} onChange={this.handleChange} placeholder="Gebruikersnaam"/>
                    <input type="password" id="inputPassword" placeholder="Wachtwoord" value={this.state.inputPassword} onChange={this.handleChange}/>
                    <input type="submit" value="Log in!"></input>
                </form>

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
                console.log("Logged in!");
            })
        event.preventDefault();
    }
    
    render() {
        return(
            <div className="logindiv">
                <h1>Welkom bij de corona-live app!</h1>
                <p>Log in of maak een nieuw account om verder te gaan.</p>
                {this.loginForm()}
            </div>
        )
    }
}

export default Login;