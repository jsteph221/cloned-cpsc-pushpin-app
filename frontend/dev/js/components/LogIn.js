import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router';
import $ from "jquery"

const server = 'http://localhost:3030'

class LogInScreen extends React.Component{
	constructor(props){
		super(props);
		this.signUp = this.signUp.bind(this);
		this.logIn = this.logIn.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePWChange = this.handlePWChange.bind(this);
		this.state = {name: 'jack', password: 'password'};
	}

	handleNameChange(event){
		this.setState({name: event.target.value})
	}

	handlePWChange(event){
		this.setState({password: event.target.value})
	}

	signUp(){
		$.ajax(
		{
			url : server+"/api/signup",
			type : "POST",
			data :
			{
				'name' : this.state.name,
				'password' : this.state.password
			},
			dataType : "json",
			success : function(data) {
				alert(data.message);
			}
		})
		.fail(
			function() { alert("ajax failure");}
		);
	}

	logIn(){
		$.ajax(
		{
			url : server+"/api/authenticate",
			type : "POST",
			data :
			{
				'name' : this.state.name,
				'password' : this.state.password
			},
			dataType : "json",
			success : function(data) {
				if (data.success === true){
					browserHistory.push('/#/');
					location.reload();
				}
				else{
					alert(data.message);
				}
			}
		})
		.fail(
			function() { alert("ajax failure");}
		);
	}

	render() {
		return (
			<section className = "Log In Screen">
				<div className = "log-in-app">
					<h1>Hello, please log in</h1>
					<table>
						<tbody>
						<tr>
							<td><b>Username</b></td>
							<td><input name='name' value={this.state.name} onChange={this.handleNameChange} type='text'></input></td>
						</tr>
						<tr>
							<td><b>Password</b></td>
							<td><input name='password' value={this.state.password} onChange={this.handlePWChange} type='text'></input></td>
						</tr>
						<tr>
							<td />
							<td><button type="button" onClick={this.signUp}>Sign up</button><button type="button" onClick={this.logIn}>Log in</button></td>
						</tr>
						</tbody>
					</table>
				</div>
			</section>
		);
	}
}

export default LogInScreen;