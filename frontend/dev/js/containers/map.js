import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import $ from 'jquery';
import Map, {GoogleApiWrapper} from 'google-maps-react'
import Marker from './Marker'
//import {Marker} from 'google-maps-react'
//import {sliderChange} from '../actions'
import {sliderChange} from '../actions'
import {previewImage} from '../actions'



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
    constructor(props) {
        super(props);
        this.state = {
            animate: true,
        };
        this.mapToImage = this.mapToImage.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    }

    mapToImage(nextProps,nextState){        

        return imageObj => <img src={this.props.url} style={{height: 10, width: 10}} />;

    }
    shouldComponentUpdate(nextProps,nextState){
        console.log(this.props.google)
        if (this.props.value != nextProps.value){
            this.setState({animate:false});
        }
        else{
            this.setState({animate:true});
        }
        console.log(this.props,nextProps)
        return true;
    }
        

    render(){
        if (!this.props.url){
            //small image to display incase no preview src
            var markersrc = './icons/placeholder.png'
        }else{
            var markersrc = this.props.url
        }
        var w = this.props.sizeX;
        var h = this.props.sizeY;
        var mrkX, mrkY;
        if (w/h >= 1){
            mrkX= this.props.value;
            mrkY = Math.ceil(mrkX/(w/h));
        }else{
            mrkY = this.props.value;
            mrkX = Math.ceil(mrkY/(h/w));
        }
        return(
           <div >
               {/*<h2>{this.props.value}</h2>*/}
               <Map id = "map" containerStyle = {{height: 300, width: 300}}
                    google={this.props.google}
                    initialCenter = {{lat:49.2820,lng:-123.1171}}
                    onClick={this.mapClicked}
                    onDragend={this.centerMoved}
                    disableDefaultUI={true}
                    zoom={15}
                    styles={styleArray}>
               <Marker
                   url = {markersrc}
                   position={{lat:49.2820, lng:-123.1171}}
                   sizeX={mrkX}
                   sizeY = {mrkY}
                    animate = {this.state.animate}
               />
               </Map>
           </div>
        );
    }
}

//
// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyBiYle_P0Auv1_rygO5ZXig6pjnQyRTgyM'
// })(PreviewMap)

PreviewMap.propTypes = {
    value: PropTypes.number,
    src: PropTypes.string,
    sizeX: PropTypes.number,
    sizeY: PropTypes.number,
}

const MapApi = GoogleApiWrapper({
    version: '3.26',
    apiKey: 'AIzaSyBiYle_P0Auv1_rygO5ZXig6pjnQyRTgyM'
})(PreviewMap)

const mapStateToProps = (state) => {
    return {
        value: state.slider.value,
        url: state.preview.src,
        sizeX: state.preview.sizeX,
        sizeY: state.preview.sizeY,
    }
}

const mapContainer = connect(mapStateToProps, null)(MapApi);
export default mapContainer;