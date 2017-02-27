import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import fabric, {Canvas, Text, Image} from 'react-fabricjs';
import $ from 'jquery'


var width = $(window).width();
var height = $(window).height();

class FabricCanvas extends Component {
	constructor(props){
		super(props);
		this.propsToImages = this.propsToImages.bind(this);
	}

	propsToImages(){
		if (this.props.images == []){
			console.log("images was empty\n");
		}
		else{
			return this.props.images.map((image) => 
				<Image
			        src={image['url']}
			        crossOrigin='use-credentials'
			        width={image['width']}
			        height={image['height']}
			        left={image['left']}
			        top={image['top']} 
			    />
		    )
		}
	}

    render() {
        return (
            <div className = "canvas" style = {{height: height * 0.45, width: width * 0.47}}>
              <Canvas
		        width={width * 0.47}
		        height={height * 0.45}>

		        {this.propsToImages()}

		          
		      </Canvas>
            </div>
        );
    }
}

FabricCanvas.propTypes = {

	images: PropTypes.arrayOf(PropTypes.shape({
		url: PropTypes.string,
		width: PropTypes.number,
		height: PropTypes.number,
		left: PropTypes.number,
		top: PropTypes.number,
	}))

}

FabricCanvas.defaultProps = {

	images: []

}

const mapStateToProps = (state) => {
	return {
		images:
			state.library.fabricImages.map((image) => 
				({
					url: image['url'],
					width: image['width'],
					height: image['height'],
					left: image['left'],
					top: image['top']
				})
			)
		
	}
}

const FabricContainer = connect(mapStateToProps, null)(FabricCanvas);



export default FabricContainer;