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
import loginComponent from './components/Login';
import {selectImage, sliderChange} from './actions';


const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);
//store.dispatch(sliderChange(90));
/*store.dispatch(selectImage('https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/2000px-SNice.svg.png'));*/

/*set default routing to login*/
hashHistory.push('/login');
const routes = (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path='/login' component={loginComponent} />
			<Route path='/' component={MainApp} />
		</Router>
	</Provider>
);

ReactDOM.render(
    routes,
    document.getElementById('root')
);
