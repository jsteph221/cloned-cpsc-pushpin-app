import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';
import {Router, Route, hashHistory} from 'react-router';
import MainApp from './components/MainApp';

const loginComponent = require('./components/Login').default;

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);

const routes = (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/' component={MainApp} />
			<Route path='/login' component={loginComponent} />
		</Router>
	</Provider>
)

ReactDOM.render(
    routes,
    document.getElementById('root')
);
