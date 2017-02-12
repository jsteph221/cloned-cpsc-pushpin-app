import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import Map, {Marker, GoogleApiWrapper} from 'google-maps-react'

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

/*
 * MARKER RENDER TO BE CONTINUED 
 * */

var windowWidth = $(window).width();
var windowHeight = $(window).height();

class PreviewMap extends Component {
    
    render(){
        return(
           <div >
               <Map containerStyle = {{height: windowHeight * 0.45, width: windowWidth * 0.46 }}
                    google={this.props.google}
                    initialCenter = {{lat:49.2800, lng:-123.1131}}
                    onClick={this.mapClicked}
                    onDragend={this.centerMoved}
                    zoom={18}

               ><Marker>
                    name={'Preview Pushpin'}
                    position={{lat:49.2820, lng:-123.1191}}
                </Marker>
               </Map>
           </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBiYle_P0Auv1_rygO5ZXig6pjnQyRTgyM'
})(PreviewMap)
