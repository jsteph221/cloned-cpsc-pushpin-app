import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import Map, {GoogleApiWrapper} from 'google-maps-react'

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

var windowWidth = $(window).width();
var windowHeight = $(window).height();

class PreviewMap extends Component {
    render(){
        return(
           <div >
               <Map style = {{height: windowHeight * 0.45, width: windowWidth * 0.46}} google={this.props.google}/>
           </div>
        );

    }
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBiYle_P0Auv1_rygO5ZXig6pjnQyRTgyM'
})(PreviewMap)
