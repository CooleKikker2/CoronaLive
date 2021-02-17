import React, { useState } from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps';
import cookie, { load, select } from 'react-cookies';
import Login from "../Login/Login";
import AddMarker from "./addMarker";
import firebase from "../../firebase";

class Map extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display: "block",
            markerBase: firebase.database().ref("markers"),
            loadedMarkers: [],
            selectedMarker: null,
        }
        this.logout = this.logout.bind(this);
        this.generateMap = this.generateMap.bind(this);
        this.showAdd = this.showAdd.bind(this);
        this.forceUpdate();

        if(cookie.load('logged')){
            this.setState({display: "block"})
            this.forceUpdate();
        }
    }


    header(){
        return(
            <header className="mapHeader">
                <i className="fas fa-home"></i>
                <i className="account fas fa-user"></i>
            </header>
        );
    }

    generateMap(){
        let loadedMarkers = [];
        this.state.markerBase.on("value", function(snapshot){
            snapshot.forEach(function(childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                loadedMarkers.push(item);
            })
        })

        console.log(loadedMarkers)

        

        loadedMarkers.forEach(marker => {
            // loopedMarkers.push(marker);
            //console.log("Marker added!");
        });

        //console.log(loopedMarkers);




        return(
            
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{lat: 52.076918, lng:5.106366}}>
                {loadedMarkers.map((marker) => (
                    <Marker 
                        key={marker.title}
                        position={{lat: marker.lat, lng: marker.long}}
                        onClick={() => {
                            this.setState({selectedMarker: null})
                            this.setState({selectedMarker: marker});
                        }}
                        icon={{
                            url: `/dist/svg/${marker.icon}.svg`,
                            scaledSize: new window.google.maps.Size(30, 30)
                        }}
                        
                    />))
                }
                
                {this.state.selectedMarker && (
                    console.log("Hey"),
                    <InfoWindow
                    position={{
                        lat: this.state.selectedMarker.lat,
                        lng: this.state.selectedMarker.long
                    }}
                    onCloseClick={() =>{
                        //this.setState({selectedMarker: null})
                    }}  
                    
                    >
                    <div className="infodiv">
                        <h3>{this.state.selectedMarker.title}</h3>
                        <p className="username">Geplaatst door: {this.state.selectedMarker.username}</p>
                        <p>{this.state.selectedMarker.description}</p>

                    </div>
                    </InfoWindow>
                )}

                </GoogleMap>
        );
    }

    

    footer(){
        return(
        <footer className="mapFooter">
            <i className="leave fas fa-sign-out-alt" onClick={this.logout}></i>
            <i className="fas fa-plus-circle" onClick={this.showAdd}></i>    
        </footer>)
    }

    showAdd(){
        this.setState({display: "addMarker"});
        this.forceUpdate();
    }

    logout(){
        this.setState({display: "login"});
        cookie.remove('logged', {path: '/'})     
    }   

    render(){
        const WrappedMap = withScriptjs(withGoogleMap(this.generateMap));
        if(this.state.display === "block"){
            return(
                <div className="map">
                    {this.header()}
                    <WrappedMap
                        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC2oopGaIUCARgdwcLX02cztRtOG4Vcvwg'}
                        loadingElement={<div style={{height: "80vh"}}/>}
                        containerElement={<div style={{height: "80vh"}}/>}
                        mapElement={<div style={{height: "80vh"}}/>}
                    />
                    {this.footer()}
                </div>
            )
        }else if(this.state.display === "login"){
            return(<Login display="block"></Login>)
        }else if(this.state.display === "addMarker"){
            return(<AddMarker display="block"></AddMarker>)
        }
        
        else{
            return("");
        }
    }
}

export default Map