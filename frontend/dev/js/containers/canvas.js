import React, {Component} from 'react';
import {connect} from 'react-redux';
import fabric, {Canvas, Text} from 'react-fabricjs';
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
		          <Text
		            text="FabricCanvas"
		            left={300}
		            top={200}
		            fill="#000000"
		            fontFamily="Arial"
		          />

		          
		      </Canvas>
            </div>
        );
    }
}

export default FabricCanvas;