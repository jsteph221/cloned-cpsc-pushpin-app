import React, {Component} from 'react';
import {connect} from 'react-redux';
import fabric, {Canvas, Text, Image} from 'react-fabricjs';
import $ from 'jquery'


var width = $(window).width();
var height = $(window).height();

class FabricCanvas extends Component {
    render() {
        return (
            <div className = "canvas" style = {{height: height * 0.45, width: width * 0.47}}>
              <Canvas
		        width={width * 0.47}
		        height={height * 0.45}>

		          <Image
	                src='./icons/thehomedepot.png'
	                width={50}
	                height={50}
	                left={300}
	                top={150}
	           	 />

		          
		      </Canvas>
            </div>
        );
    }
}

export default FabricCanvas;