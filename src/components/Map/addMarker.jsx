import React from "react";
import firebase from "../../firebase";
import cookie from 'react-cookies';
import Map from "./map";

class Addmarker extends React.Component{
    constructor(props){
        super(props);
        this.addForm = this.addForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.showError = this.showError.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.showMap = this.showMap.bind(this);
        this.state = {
            inputTitle: '',
            inputDescription: '',
            inputIcon: 0,
            inputLat: 0, //Inport from geolocation
            inputLong: 0, //Inport from geolocation
            markerBase: firebase.database().ref("markers"),
            error: "",
            display: "block",
            user: cookie.load('logged'),
        }
    }


    addForm(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" id="inputTitle" value={this.state.inputTitle} onChange={this.handleChange} placeholder="Titel"/>
                    <input type="text" id="inputDescription" value={this.state.inputDescription} onChange={this.handleChange} placeholder="Bescrijving"/>
                    <select id="inputIcon" name="inputIcon" onChange={this.handleChange}>
                        <option value="0">Boodschappen doen</option>
                        <option value="2">Fietsen</option>
                        <option value="3">Hardlopen</option>
                        <option value="4">Geldzaken</option>
                        <option value="5">Klussen</option>
                        <option value="6">Overigen</option>
                    </select>
                    <p className="error">{this.state.error}</p>
                    <input type="submit" value="Maak Marker aan!"></input>
                    

                </form>
            </div>
        )
    }

    showPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getPosition);
        }else{
        }
    }

    getPosition(position){
        console.log(this.state.inputIcon);
        this.setState({inputLat: position.coords.latitude});
        this.setState({inputLong: position.coords.longitude});
        console.log(position.coords.longitude);
        this.state.markerBase.push().set({
            title: this.state.inputTitle,
            description: this.state.inputDescription,
            icon: this.state.inputIcon,
            lat: this.state.inputLat,
            long: this.state.inputLong,
            approved: 0,
            username: this.state.user.displayName,
        });
        this.setState({display: "map"});
    }

    showError(){
        console.log("Error!");
    }

    showMap(){
        this.setState({display: "map"});
        this.forceUpdate();
    }

    handleSubmit(event){
            this.showPosition();
            



        
        event.preventDefault();
    };

    handleChange(event){
        if(event.target.id === "inputTitle"){
            this.setState({inputTitle: event.target.value})
        }else if(event.target.id === "inputDescription"){
            this.setState({inputDescription: event.target.value})
        }else if(event.target.id === "inputIcon"){
            this.setState({inputIcon: event.target.value})
            console.log("iCON");
        }
    }
    


    render(){
        console.log(cookie.load('logged'));
        if(this.state.display === "block"){
            return(
                <div className="logindiv">
                    <i className="fas fa-home createHome" onClick={this.showMap}></i>
                    <h1>Maak een nieuwe marker aan!</h1>
                    <p>Maak een nieuwe marker aan en krijg hulp!</p>
                    {this.addForm()}
                </div>
            )
        }else{
            return(<Map></Map>)
        }
    }
}

export default Addmarker;