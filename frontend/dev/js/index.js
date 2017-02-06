import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import {Router, hashHistory, Redirect, Route, IndexRoute, Link} from 'react-router'
import Container from './containers/Container'

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);

const routeMap = {
  'home': {
    name: 'Home',
    component: require('./components/App').default
  },
  'map': {
    name: 'Google Map',
    component: require('./components/Google-Map').default
  }
}

const createElement = (Component, props) => {
  const pathname = props.location.pathname.replace('/', '')
  const routeDef = routeMap[pathname];
  const newProps = {
    routeMap, pathname, routeDef
  }
  return <Component {...newProps} {...props} />
}

const routes = (
  <Provider store={store}>
  <Router createElement={createElement}
          history={hashHistory}>
    <Route component={Container}
           path='/'>
      {Object.keys(routeMap).map(key => {
        const r = routeMap[key]
        return (<Route
                key={key}
                path={key}
                name={r.name}
                component={r.component} />)
      })}
      <IndexRoute component={routeMap['map'].component} />
    </Route>
  </Router>
  </Provider>
)

const mountNode = document.getElementById('root');
ReactDOM.render(routes, mountNode);
