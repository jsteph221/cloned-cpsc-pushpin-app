import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

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
                             <img src={url} style={{height: 20, width: 20, padding: 10}} />);

    }

	render(){
		const treeImages = this.mapToImage(this.state.images);

		return (
			<div>
				{console.log(this.props.new_image)}
				<p>{treeImages}</p>
			</div>
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