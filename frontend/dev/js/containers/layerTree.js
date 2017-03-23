import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactScrollbar from 'react-scrollbar-js';

class LayerTree extends Component {

	constructor(props){
		super(props);
		this.mapToImage = this.mapToImage.bind(this);
		this.state = {
			images: []
		}
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.event == "new"){
			if (this.state.images == []){
				this.state.images = [nextProps.new_image];
			}
			else{
				this.state.images = [nextProps.new_image].concat(this.state.images);
			}
		}
		else if (nextProps.event == "up"){
			var zindex = this.state.images.length - nextProps.new_zindex - 1;
			console.log("tree zindex is "+zindex);
			if (zindex >= 0){
				var temp = this.state.images[zindex];
				this.state.images[zindex] = this.state.images[zindex+1];
				this.state.images[zindex+1] = temp;
			}
		}
		else if (nextProps.event == "down"){
			var zindex = this.state.images.length - nextProps.new_zindex - 1;
			console.log("tree zindex is "+zindex);
			if (zindex <= this.state.images.length - 1){
				var temp = this.state.images[zindex];
				this.state.images[zindex] = this.state.images[zindex-1];
				this.state.images[zindex-1] = temp;
			}
		}
	}

    mapToImage(imageURLs){

        return imageURLs.map((url) =>                              
                             <p><img src={url} style={{height: 30, width: 30, padding:10}} /> <br /></p>);

    }

	render(){
		const treeImages = this.mapToImage(this.state.images);

		return (
					<ReactScrollbar style = {{height: 300, width: 150}}><div>{treeImages}</div></ReactScrollbar>
		);
	}
}


LayerTree.propTypes = {
    new_image: PropTypes.string.isRequired,
    new_zindex: PropTypes.number.isRequired,
    new_object: PropTypes.object.isRequired,
    event: PropTypes.string.isRequired
}

LayerTree.defaultProps = {
    new_image: "",
    new_zindex: 0,
    new_object: undefined,
    event: "new"
}

const mapStateToProps = (state) => {
	return {
		new_image: state.tree.new_image,
		new_zindex: state.tree.new_zindex,
		new_object: state.tree.new_object,
		event: state.tree.event
	}
}


const LayerContainer = connect(mapStateToProps, null)(LayerTree);

export default LayerContainer;