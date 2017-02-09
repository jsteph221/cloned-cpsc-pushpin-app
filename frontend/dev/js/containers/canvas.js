import React, {Component} from 'react';
import {connect} from 'react-redux';

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class Canvas extends Component {
    render() {
        return (
            <div>
                <h2>This is Canvas Container</h2>
            </div>
        );
    }
}

export default Canvas;