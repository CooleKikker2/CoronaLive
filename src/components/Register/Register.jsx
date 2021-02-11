import React from "react";
import firebase from "../../firebase";

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display: this.props.display,
            inputPassword: "",
            inputUsername: "",
            inputCheck: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    registerForm(){
        return(
            <div className="RegisterForm">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="E-mailadres" required="required" onChange={this.handleChange} id="inputEmail"></input>
                    <input type="password" placeholder="Wachtwoord" required="required" onChange={this.handleChange} id="inputPassword"></input>
                    <input type="password" placeholder="Wachtwoord bevestigen" required="required" onChange={this.handleChange} id="inputCheck"></input>
                    <input type="submit" value="Maak account aan!"></input>
                </form>
            </div>
        )
    }

    handleChange(event){
        if(event.target.id === "inputEmail"){
            this.setState({inputUsername: event.target.value})
        }else if(event.target.id === "inputPassword"){
            this.setState({inputPassword: event.target.value})
        }else{
            this.setState({inputCheck: event.target.value})
        }
    }

    handleSubmit(){
        console.log("Submit Handled!");
    }

    render(){
        if(this.state.display === "block"){
            return(
                <div className="logindiv">
                    <h1>Registreer op de Corona-Live App!</h1>
                    <p>Maak hier een nieuw account aan</p>
                    {this.registerForm()}
                    
                </div>
            );
        }else{  
            return "";
        }
    }
}


export default Register