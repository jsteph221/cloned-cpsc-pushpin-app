import React from 'react'
import ReactDOM from 'react-dom'
import { hashHistory } from 'react-router';
import $ from "jquery"
import cookie from 'react-cookie';

import server from '../config/server';


class LogInScreen extends React.Component{
	constructor(props, context){
		super(props, context);
		this.signUp = this.signUp.bind(this);
		this.logIn = this.logIn.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handlePWChange = this.handlePWChange.bind(this);
		this.state = {name: '', password: ''};
	}

	componentWillMount(){
        $.ajax(
        {
            url : server+"/api",
            type : "GET",
            dataType: "json",
            xhrFields: {
               withCredentials: true
            },
            crossDomain: true,
            success : function(data) {
                if (data.success == true){
                    hashHistory.push("/");
                }
            }
        })
        .fail(
            function(data, status) { 
                hashHistory.push("/login");
            }
        ); 
    }

	componentWillReceiveProps(nextProps) {
    this.setState({
        children: nextProps.children
    });
	}

	handleNameChange(event){
		this.setState({name: event.target.value})
	}

	handlePWChange(event){
		this.setState({password: event.target.value})
	}

	signUp(){
		if(this.state.name == "" || this.state.password == ""){
			alert("Please enter non-blank username or password");
			return;
		}
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
			function(xhr) { alert("ajax failure\nHTTP "+xhr.status);}
		);
	}

	logIn(){
		if(this.state.name == "" || this.state.password == ""){
			alert("Please enter non-blank username or password");
			return;
		}
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
					cookie.save("token", data.token);
					hashHistory.push('/');
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
			<section className = "Log In Screen">
				<div className = "log-in-app">
					  <div className="form">
					    <div className="login-form">
					      <input name='name' value={this.state.name} onChange={this.handleNameChange} type='test' placeholder='Username'/>
					      <input name='password' value={this.state.password} onChange={this.handlePWChange} type='password' placeholder='Password'/>
					      <button onClick={this.logIn}>logIn</button>
					      <button onClick={this.signUp}>Sign Up</button>
					    </div>
					  </div>
				</div>
			</section>
		);
	}
}



export default LogInScreen;