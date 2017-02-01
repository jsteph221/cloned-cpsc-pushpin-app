import React, {Component} from 'react';
import fabric, {Canvas, Text, IText, Circle, Path} from 'react-fabricjs';
import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"
require('../../scss/style.scss');

var canvasWidth = screen.width/2;
var canvasHeight = screen.height*0.9;


const HelloFabric = React.createClass({
  render: function() {
    return (
    		<section className = "mainApp">

    			<div className = "fabricApp">
			      <Canvas
			        width={canvasWidth}
			        height="800">
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
			    </div>

			    <div className = "mapApp">
			    	Insert map here
			    </div>

		    </section>

    );
  }
});



export default HelloFabric;
