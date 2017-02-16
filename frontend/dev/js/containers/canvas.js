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

function canvasToImage(ctx,canvas){
    var w = canvas.width,
    h = canvas.height,
    pix = {x:[], y:[]},
    imageData = ctx.getImageData(0,0,canvas.width,canvas.height),
    x, y, index;

    for (y = 0; y < h; y++) {
        for (x = 0; x < w; x++) {
            index = (y * w + x) * 4;
            if (imageData.data[index+3] > 0) {

                pix.x.push(x);
                pix.y.push(y);

            }   
        }
    }
    pix.x.sort(function(a,b){return a-b});
    pix.y.sort(function(a,b){return a-b});
    var n = pix.x.length-1;

    w = pix.x[n] - pix.x[0];
    h = pix.y[n] - pix.y[0];
    var cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);
    
    var canvas1= document.createElement('canvas');
    var ctx1=canvas1.getContext('2d');    
    canvas1.width = w;
    canvas1.height = h;
    ctx1.putImageData(cut, 0, 0);

    var image = canvas1.toDataURL();
    return image;
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
	                src='./icons/logo_tetrad.png'
	                width={50}
	                height={50}
	                left={300}
	                top={150}
	           	 />

		          
		      </Canvas>
            <button onClick = {
                function(){
                    console.log("Clicked saved canvas");
                    var canvas = document.getElementById("canvas_form");
                    var ctx = canvas.getContext('2d');
                    var data = canvasToImage(ctx,canvas);
                    saveRenderedCanvas(data);
                }
            }>Save Image</button>
            </div>           
        );
    }
}

export default FabricCanvas;