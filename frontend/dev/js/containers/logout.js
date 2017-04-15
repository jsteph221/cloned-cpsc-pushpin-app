import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router';
import $ from "jquery"
import cookie from 'react-cookie';

import server from '../config/server';


class LogOut extends React.Component{
	logOut(){
		$.ajax(
		{
			url : server+"/api/signout",
			type : "POST",
			dataType : "json",
			success : function(data) {
				if (data.success === true){
					cookie.save("token", data.token);
					hashHistory.push('/login');
					// !!! dispatch actions to clear the map
				}
				else{
					alert(data.message);
				}
			}
		})
		.fail(
			function(xhr) { alert("ajax failure\nHTTP "+xhr.status);}
		);
	}

	render() {
		return (
			<button onClick = {this.logOut}>log out</button>
		);
	}
}



export default LogOut;