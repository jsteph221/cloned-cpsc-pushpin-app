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
		if (this.state.images == []){
			this.state.images = [nextProps.new_image];
		}
		else{
			this.state.images = [nextProps.new_image].concat(this.state.images);
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
    images: PropTypes.array.isRequired
}

LayerTree.defaultProps = {
    new_image: "",
    images: []
}

const mapStateToProps = (state) => {
	return {
		new_image: state.library.src
	}
}


const LayerContainer = connect(mapStateToProps, null)(LayerTree);

export default LayerContainer;