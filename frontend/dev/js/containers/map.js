import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import Map, {GoogleApiWrapper} from 'google-maps-react'
import Marker from './Marker'

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

/*
 * MARKER RENDER TO BE CONTINUED 
 * */

var windowWidth = $(window).width();
var windowHeight = $(window).height();
var styleArray = [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}];



class PreviewMap extends Component {
    
    render(){
        return(
           <div >
               <Map containerStyle = {{height: windowHeight * 0.45, width: windowWidth * 0.46 }}
                    google={this.props.google}
                    initialCenter = {{lat:49.2820,lng:-123.1171}}
                    onClick={this.mapClicked}
                    onDragend={this.centerMoved}
                    zoom={18}
                    styles={styleArray}

               ><Marker>
                    map = Map
                    name={'Preview Pushpin'}
                    position={{lat:49.2820, lng:-123.1191}}
                    icon = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-128.png"
                </Marker>
               </Map>
           </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBiYle_P0Auv1_rygO5ZXig6pjnQyRTgyM'
})(PreviewMap)
