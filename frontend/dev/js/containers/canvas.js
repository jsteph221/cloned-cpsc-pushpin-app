import React, {Component} from 'react';
import {connect} from 'react-redux';
import fabric, {Canvas, Text, Image} from 'react-fabricjs';
import $ from 'jquery'


var width = $(window).width();
var height = $(window).height();

function saveRenderedCanvas(dataURI){
    var server = 'http://localhost:3030';
    
    $.ajax(
        {
            url : server+"/api/projects",
            type : "GET",
            xhrFields: {
                   withCredentials: true
            },
            crossDomain: true,
            success : function(data) {
                if (data.success === true){
                    console.log("here");
                    var project = data.projects[0];
                    var renderedImageEndPoint = server+"/api/projects/"+project+"/renderedImages";                      
                    $.ajax(
                           {
                            
                                url: renderedImageEndPoint,
                                type:"POST",
                                xhrFields: {
                                    withCredentials: true
                                },
                                data :{
                                    image:dataURI
                                },
                                crossDomain: true,
                                
                                success: function(data){
                                    if (data.success == true){
                                        alert("Your Image has been Saved");
                                    }else{
                                        alert(data.message);
                                    }
                                }
                        })
                        .fail(
                            function() { alert("ajax failure");}
                        );
                        
                    
                }
            }
        })
        .fail(
            function() { alert("ajax failure");}
        );
    
        
}
                

class FabricCanvas extends Component {
    render() {
        return (
            <div className = "canvas" style = {{height: height * 0.45, width: width * 0.47}}>
              <Canvas
                id = "canvas_form"
		        width={width * 0.47}
		        height={height * 0.45}>

		          <Image
	                src='./icons/thehomedepot.png'
	                width={50}
	                height={50}
	                left={300}
	                top={150}
	           	 />

		          
		      </Canvas>
            <button onClick = {
                function(){
                    console.log("Clicked saved canvas");
                    var ctx = document.getElementById("canvas_form").toDataURL("image/png");
                    saveRenderedCanvas(ctx);
                }
            }>Save Image</button>
            </div>           
        );
    }
}

export default FabricCanvas;