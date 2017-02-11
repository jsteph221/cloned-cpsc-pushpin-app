import React, {Component} from 'react';
import {connect} from 'react-redux';

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

import Map, {GoogleApiWrapper} from 'google-maps-react'

class PreviewMap extends Component {
    render(){

        return(
           <div>
               <Map google={this.props.google}/>
           </div>
        );

    }
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(PreviewMap)
