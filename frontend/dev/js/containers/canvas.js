import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import fabric, {Canvas, Text, Image} from 'react-fabricjs';
import $ from 'jquery'
import {previewImage} from '../actions'


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

function canvasToImage(ctx,canvas,size){
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
    
    //Posts cropped image to new canvas and creates htmlimagesrc
    var canvas1= document.createElement('canvas');
    var ctx1=canvas1.getContext('2d');    
    canvas1.width = w;
    canvas1.height = h;
    ctx1.putImageData(cut, 0, 0);   
    var imgURL = canvas1.toDataURL();
    var tmpImage = document.createElement("IMG");    
    tmpImage.src = imgURL;
    //Creates new canvas and draw cropped image of specific size
    var canvas2 = document.createElement('canvas');
    var ctx2 = canvas2.getContext('2d');
    canvas2.width = size;
    canvas2.height = size;
    ctx2.drawImage(tmpImage,0,0,size,size);
    var final = canvas2.toDataURL();
    
    console.log(final)
   
    return final;
    
}
     

class FabricCanvas extends Component {
	constructor(props){
		super(props);
        this.state = {};
		this.propsToImages = this.propsToImages.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
        this.saveButton = this.saveButton.bind(this);
	}


	propsToImages(){
		if (this.props.images == []){
			console.log("images was empty\n");
		}
		else{
			return this.props.images.map((image) => 
				<Image
			        src={image['url']}
			        crossOrigin='use-credentials'
			        width={image['width']}
			        height={image['height']}
			        left={image['left']}
			        top={image['top']} 
			    />
		    )
		}
	}
    
    buttonClick(){ 
        console.log(this);
        var canvas = document.getElementById("canvas_form");
        var ctx = canvas.getContext('2d');
        var data = canvasToImage(ctx,canvas,this.props.value);
        this.props.previewClicked(data);
    }
    
    saveButton(){        
        var canvas = document.getElementById("canvas_form");
        var ctx = canvas.getContext('2d');
        var data = canvasToImage(ctx,canvas,this.props.value);
        saveRenderedCanvas(data);
    }    
    


    render() {        
        return (
            <div className = "canvas" style = {{height: height * 0.45, width: width * 0.47}}>
              <Canvas
                id = "canvas_form"
		        width={width * 0.47}
		        height={height * 0.45}>
                
                 <Image
	                src='./icons/zoeskitchen.png'
	                width={50}
	                height={50}
	                left={300}
	                top={150}
	           	 />
		        {this.propsToImages()}          
		      </Canvas>
              <button onClick = {this.saveButton
                
            }>Save Image</button>
            <button onClick = {this.buttonClick}>Preview</button>
            
            </div>            
        );
    }
}

FabricCanvas.propTypes = {

	images: PropTypes.arrayOf(PropTypes.shape({
		url: PropTypes.string,
		width: PropTypes.number,
		height: PropTypes.number,
		left: PropTypes.number,
		top: PropTypes.number,
	})),
    previewClicked: PropTypes.func.isRequired,
    value: PropTypes.number
}

FabricCanvas.defaultProps = {

	images: [],
    previewClicked: (dataURL) => console.log("Clicked on preview")

}

function mapDispatchToProps(dispatch) {
    return ({
        previewClicked: (dataURL) => {dispatch(previewImage(dataURL))}
    })
}


const mapStateToProps = (state) => {
	return {
		images:
			state.library.fabricImages.map((image) => 
				({
					url: image['url'],
					width: image['width'],
					height: image['height'],
					left: image['left'],
					top: image['top']
				})
			),
        value: state.slider.value
		
	}
}

const FabricContainer = connect(mapStateToProps, mapDispatchToProps)(FabricCanvas); 

export default FabricContainer;