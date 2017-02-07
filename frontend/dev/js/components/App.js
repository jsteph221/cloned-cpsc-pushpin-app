import React, {Component} from 'react';
import fabric, {Canvas, Text, IText, Circle, Path} from 'react-fabricjs';
import GoogleMap from "react-google-map"
import GoogleMapLoader from "react-google-maps-loader"
import $ from "jquery"
require('../../scss/style.scss');


var canvasWidth = screen.width/2;
var canvasHeight = screen.height*0.9;
var wwidth = $( window ).width();
var nheight = $( window ).height();
var wheight = $( window ).height() * 0.50;
var theight = $( window ).height() * 0.50;
const server = 'http://localhost:3030'


function postPng(image, title){
    $.post(server+'/finalPin',
        {
            title: "testtitle",
            image: image
        },
        function(data,status){
            console.log("Data: "+data + "\nStatus: "+ status);
        });
}

function logIn(){
	//var username = document.getElementById('name').value;
	//var password = document.getElementById('password').value;
	var username = 'jack';
	var password = 'password';
	$.ajax(
	{
		url : server+"/api/authenticate",
		type : "POST",
		headers : 
		{
			'Content-Type' : 'x-www-form-urlencoded'
		},
		data :
		{
			'name' : username,
			'password' : password
		},
		dataType : "json",
		success : function(data) {
			if (data.success === true){
				alert("You have now logged in");
				var token = data.token;
			}
			else{
				alert("No account found for the given username and password");
			}
		}
	})
	.done(
		function() { alert("log in works");}
	)
	.fail(
		function() { alert("ajax failure");}
	)
	.always(
		function() { alert("ajax call complete");}
	);
}

function signUp(){
	//var username = document.getElementById('name').value;
	//var password = document.getElementById('password').value;
	var username = 'jack';
	var password = 'password';
	$.ajax(
	{
		url : server+"/api/signup",
		type : "POST",
		headers : 
		{
			'Content-Type' : 'x-www-form-urlencoded'
		},
		data :
		{
			'name' : username,
			'password' : password
		},
		dataType : "json",
		success : function(data) {  
			if (data.success === true){
				alert("Successfully created account");
			}
			else{
				alert("An account with that name already exists");
			}
		}
	})
	.done(
		function() { alert("sign up works");}
	)
	.fail(
		function() { alert("ajax failure");}
	)
	.always(
		function() { alert("ajax call complete");}
	);
}

const LogInScreen = React.createClass({
	render: function(){
		return (
			<section className = "Log In Screen">
				<div className = "log-in-app">
					<h1>Hello, please log in</h1>
					<table>
						<tbody>
						<tr>
							<td><b>Username</b></td>
							<td><input name='name' type='text'></input></td>
						</tr>
						<tr>
							<td><b>Password</b></td>
							<td><input name='password' type='text'></input></td>
						</tr>
						<tr>
							<td />
							<td><button type="button" onClick={function(){signUp()}}>Sign up</button><button type="button" onClick={function(){logIn()}}>Log in</button></td>
						</tr>
						</tbody>
					</table>
				</div>
			</section>
		);
	}
});

const HelloFabric = React.createClass({
  render: function() {
    return (
    		<section className = "mainApp" style={{"width": wwidth, "height": nheight}}>

    			<div className = "fabricApp" style={{"width": wwidth / 2, "height": wheight}}>
			      <Canvas
			        width={wwidth/2}
			        height= {wheight}>
			          	<Text
			            text="Fabric App!!"
			            left={300}
			            top={300}
			            fill="#000000"
			            fontFamily="Arial"
			    		/>

	            		<Path
		                path="M 0 0 L 300 100 L 200 300 z"
		                fill="red"
		                stroke="green"
		                strokeWidth={10}
		                opacity={0.5}
	           			 />	

	           			 <fabric.Triangle
	           			 fill="pink"/>			
					</Canvas>
					<div className = "fabrictools" style={{"height": theight, "width": wwidth}}>
						Fabric toolbar here
					</div>
			    </div>

			    <div className = "mapApp" style={{"width": (wwidth/2),
												  "height": wheight}}>
			    	Insert map here
			    </div>

		    </section>
    );
  }
});

export default LogInScreen;
