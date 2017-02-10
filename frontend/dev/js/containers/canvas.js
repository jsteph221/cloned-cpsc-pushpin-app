import React, {Component} from 'react';
import {connect} from 'react-redux';
import fabric, {Canvas, Text} from 'react-fabricjs';
import $ from 'jquery'


var width = $(window).width();
var height = $(window).height();

class FabricCanvas extends Component {
    render() {
        return (
            <div className = "canvas" style = {{height: height/2, width: width/2}}>
              <Canvas
		        width={width/2}
		        height={height/2}>
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