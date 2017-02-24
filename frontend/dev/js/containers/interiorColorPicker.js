/**
 * Created by irisr on 2017-02-23.
 */
'use strict'

import React from 'react'
import { SwatchesPicker } from 'react-color'

class InteriorColorPicker extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            displayColorPicker: false,
            background: '#fff',
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    // handleChange(e) {
    //     e.preventDefault();
    //     this.setState({value: e.target.value});
    //
    // }


    handleChange (color, event) {
        this.setState({ background: color.hex });
    };

    handleClick () {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose () {
        this.setState({ displayColorPicker: false })
    };

    render() {
        const popover = {
            position: 'absolute',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
        return (
            <div>
                <h4>Picked Color: {this.state.background}</h4>
                <button onClick={ this.handleClick }>Pick Color</button>
                { this.state.displayColorPicker ? <div style={ popover }>
                        <div style={ cover } onClick={ this.handleClose }/>
                        <SwatchesPicker onChange={ this.handleChange }/>
                    </div> : null }
            </div>
        )
    }
}


export default InteriorColorPicker;