import React, {Component, PropTypes} from 'react';
import Slider from 'rc-slider'
import {sliderChange} from '../actions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class SizeSlider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onAfterChange= this.onAfterChange.bind(this);
    }

    onSliderChange(value) {
        this.props.changeSize(value);
    }

    onAfterChange(value) {
        //console.log(value);
    }

    render() {
        return (
            <div style = {{height: 100, width: 600, marginLeft: 10}}>
                <p>{this.props.value}px</p>
                <Slider
                    min={5}
                    max={100}
                    value={this.props.value}
                    onChange={this.onSliderChange}
                    onAfterChange={this.onAfterChange}
                />
            </div>
        );
    }
}
SizeSlider.propTypes = {
    value: PropTypes.number,
    changeSize: PropTypes.func
}


const mapStateToProps = (state) => {
    return {
        value: state.slider.value
    }
}


function mapDispatchToProps(dispatch) {
    return ({
        changeSize: (size) => {dispatch(sliderChange(size))}
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SizeSlider);
