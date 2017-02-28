import React, {Component} from 'react';
import Slider from 'rc-slider'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class SizeSlider extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: 100,
        };
        this.onSliderChange = this.onSliderChange.bind(this);
        this.onAfterChange= this.onAfterChange.bind(this);
    }

    onSliderChange(value) {
        this.setState({
            value: value,
        });
    }
    onAfterChange(value) {
        console.log(value);
    }

    render() {
        return (
            <div>
                <h2>{this.state.value}%</h2>
                <Slider
                    min={50}
                    max={150}
                    value={this.state.value}
                    onChange={this.onSliderChange} onAfterChange={this.onAfterChange}
                />
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        value: state.value
    };
}

export default connect(mapStateToProps)(SizeSlider);
