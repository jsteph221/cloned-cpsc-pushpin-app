import React, {Component, PropTypes} from 'react';
import Slider from 'rc-slider'
import {sliderChange} from '../actions'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class SizeSlider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: 28,
        };
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onAfterChange= this.onAfterChange.bind(this);
    }

    onSliderChange(value) {
        this.setState({
            value: value,
        });
        this.props.changeSize(value);
    }

    onAfterChange(value) {
        //console.log(value);
    }

    render() {
        return (
            <div style = {{height: 100, width: 600, marginLeft: 10}}>
                <p>{this.state.value}px</p>
                <Slider
                    min={5}
                    max={45}
                    value={this.state.value}
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

export default connect(null, mapDispatchToProps)(SizeSlider);
