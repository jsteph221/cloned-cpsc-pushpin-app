import React from 'react'
import ReactDOM from 'react-dom'
import fabric, {Canvas, Text, IText, Circle, Path} from 'react-fabricjs';
import $ from "jquery"
import Map, {Marker,GoogleApiWrapper} from 'google-maps-react'
require('../../scss/style.scss');

import UploadForm from './UploadForm'

var canvasWidth = screen.width/2;
var canvasHeight = screen.height*0.9;
var wwidth = $( window ).width();
var nheight = $( window ).height();
var wheight = $( window ).height() * 0.50;
var theight = $( window ).height() * 0.50;
var styleArray = [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}];


const Container = React.createClass({
    getInitialState: function() {
        return {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
    },

    onMapMoved: function(props, map) {
        const center = map.center;
    },

    onMarkerClick: function(props, marker) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    },

    onMapClicked: function(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    },
    
    //iris: upload mmy image
    handleSubmit: function(){
        
    },

    render: function() {
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }

        return (
        <section className = "mainApp" style={{"width": wwidth, "height": nheight}}>

            <div className = "fabricApp" style={{"width": wwidth / 2, "height": wheight}}>
                <Canvas
                    width={wwidth/2}
                    height= {wheight}>
                    <Text
                        text="Fabric App!!"
                        left={300}
                        top={300}
                        fill="#000000"
                        fontFamily="Arial"
                    />

                    <Path
                        path="M 0 0 L 300 100 L 200 300 z"
                        fill="red"
                        stroke="green"
                        strokeWidth={10}
                        opacity={0.5}
                    />

                    <fabric.Triangle
                        fill="pink"/>
                </Canvas>
                <div className = "fabrictools" style={{"height": theight, "width": wwidth}}>
                    Fabric toolbar here
                                
                    <div>
                    <UploadForm />
                    </div>
                </div>
            </div>

            <div className = "mapApp" style={{"width": (wwidth/2),
                                                  "height": wheight}}>
                <Map google={this.props.google}
                     style={{"width": wwidth / 2, "height": wheight}}
                     className={'map'}
                     initialCenter= {{lat:49.2820,lng:-123.1171}}
                     zoom={15}
                     containerStyle={{}}
                     disableDefaultUI={true}
                    //centerAroundCurrentLocation={true}
                     onClick={this.onMapClicked}
                     onDragend={this.onMapMoved}
                     styles={styleArray}
                >
                    <Marker icon={'./icons/costcowholesalecorp.png'} position={{lat:49.2800, lng:-123.1131}} />
                    <Marker icon={'./icons/thehomedepot.png'} position={{lat:49.2820, lng:-123.1131}} />
                    <Marker icon={'./icons/toysrus.png'} position={{lat:49.2840, lng:-123.1131}} />
                    <Marker icon={'./icons/costcowholesalecorp.png'} position={{lat:49.2800, lng:-123.1151}} />
                    <Marker icon={'./icons/thehomedepot.png'} position={{lat:49.2820, lng:-123.1151}} />
                    <Marker icon={'./icons/toysrus.png'} position={{lat:49.2840, lng:-123.1151}} />
                    <Marker icon={'./icons/costcowholesalecorp.png'} position={{lat:49.2800, lng:-123.1171}} />
                    <Marker icon={'./icons/thehomedepot.png'} position={{lat:49.2820, lng:-123.1171}} />
                    <Marker icon={'./icons/toysrus.png'} position={{lat:49.2840, lng:-123.1171}} />
                    <Marker icon={'./icons/costcowholesalecorp.png'} position={{lat:49.2800, lng:-123.1191}} />
                    <Marker icon={'./icons/thehomedepot.png'} position={{lat:49.2820, lng:-123.1191}} />
                    <Marker icon={'./icons/toysrus.png'} position={{lat:49.2840, lng:-123.1191}} />
                    <Marker icon={'./icons/costcowholesalecorp.png'} position={{lat:49.2800, lng:-123.1211}} />
                    <Marker icon={'./icons/thehomedepot.png'} position={{lat:49.2820, lng:-123.1211}} />
                    <Marker icon={'./icons/toysrus.png'} position={{lat:49.2840, lng:-123.1211}} />
                </Map>
            </div>

        </section>

        )
    }
});


export default Container;
/**
 * Created by Sven on 2/5/2017.
 */