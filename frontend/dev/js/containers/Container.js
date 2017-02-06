import React, {PropTypes as T} from 'react'
import ReactDOM from 'react-dom'
import {Link} from 'react-router'
import {GoogleApiWrapper} from 'google-maps-react'

export const Container = React.createClass({

  propTypes: {
    children: T.element.isRequired
  },

  contextTypes: {
    router: T.object
  },

  renderChildren: function() {
    const {children} = this.props;
    if (!children) return;

    const sharedProps = {
      google: this.props.google,
      loaded: this.props.loaded
    }
    return React.Children.map(children, c => {
      return React.cloneElement(c, sharedProps, {

      });
    })
  },

  render: function() {
    const {routeMap, routeDef} = this.props;
    const {router} = this.context;

    const c = this.renderChildren();
    return (
      <div>{c}</div>
    )
  }
})

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo',
  libraries: ['places','visualization']
})(Container)
