import React, {Component} from 'react';
import fabric, {Canvas, Text, IText, Circle, Path} from 'react-fabricjs';
import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"
import $ from "jquery"
require('../../scss/style.scss');


var canvasWidth = screen.width/2;
var canvasHeight = screen.height*0.9;
var wwidth = $( window ).width() / 2;
var wheight = $( window ).height() * 0.75;
var theight = $( window ).height() * 0.22;


const HelloFabric = React.createClass({
  render: function() {
    return (
    		<section className = "mainApp">

    			<div className = "fabricApp" style={{"width": wwidth}}>
			      <Canvas
			        width={wwidth}
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
					<div className = "fabrictools" style={{"height": theight}}>
						Fabric toolbar here
					</div>
			    </div>

			    <div className = "mapApp" style={{"width": wwidth - 50}}>
			    	Insert map here
			    </div>

		    </section>

    );
  }
});



export default HelloFabric;
