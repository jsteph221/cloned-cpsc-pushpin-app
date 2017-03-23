'use strict'

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
//import fabric, {Canvas, Text, Image} from 'react-fabricjs';
import {fabric} from 'fabric-webpack'
import $ from 'jquery'
import {previewImage, imageBroughtUp, imageSentDown, imageDeleted, canvasCleared} from '../actions'
import { SketchPicker } from 'react-color';
import Slider, { Range } from 'rc-slider'
import Modal from 'react-modal';
import LayerTree from '../containers/layerTree'


import { SwatchesPicker } from 'react-color'
import SizeSlider from '../containers/slider'

var width = $(window).width();
var height = $(window).height();
var cHex;
var showPicker = false;
var freeText = "Enter Freehand Draw";
var stateTest;
var colorMode;
var alpha;
var rgb;

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
                                        console.log('saved');
                                    }else{
                                        alert(data.message);                    
                                    }
                                }
                        })
                        .fail(
                            function() { alert("ajax failure"); return false;}
                        );
                        
                    
                }
            }
        })
        .fail(
            function() { alert("ajax failure");return false;}        
        ); 
    return true;
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
    var sizeX,sizeY;
    if (w/h >= 1){
        sizeX= size;
        sizeY = Math.ceil(sizeX/(w/h));
    }else{
        sizeY = size;
        sizeX = Math.ceil(sizeY/(h/w));
    }
    //Creates new canvas and draw cropped image of specific size
    var canvas2 = document.createElement('canvas');
    var ctx2 = canvas2.getContext('2d');
    canvas2.width = sizeX;
    canvas2.height = sizeY;
    ctx2.drawImage(tmpImage,0,0,sizeX,sizeY);
    var finalUrl = canvas2.toDataURL();    
    var img = new Image();
    img.src = finalUrl;
    img.height = sizeY;
    img.width = sizeX;
    return img;
    
}
    const customStyles = {      
          overlay : {
            backgroundColor   : 'rgba(0, 0, 0, 0.5)'
          },
          content : {
            margin: '15% auto',
            left:'300',
            right:'490',
            width: '30%',
            height:'30%',
            background: '#fefefe',
            overflow : 'hiddden',
            padding:'0px',
          }
      
    };


class FabricCanvas extends Component {
	constructor(props){
		super(props);
        this.state = {
            modalIsOpen:false,
            range:[25,75],
            canvas : null,
            text: "Freehand On",
            image_number: 0
        };
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onRangeChange = this.onRangeChange.bind(this);        
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
        this.saveButton = this.saveButton.bind(this);
        this.drawImage = this.drawImage.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.moveObjectForward = this.moveObjectForward.bind(this);
        this.moveObjectBackward = this.moveObjectBackward.bind(this);
        this.deleteActiveObject = this.deleteActiveObject.bind(this);
        this.addText = this.addText.bind(this);
        this.selectColor = this.selectColor.bind(this);
        this.setHalo = this.setHalo.bind(this);
        this.enterDrawingMode = this.enterDrawingMode.bind(this);
        this.choose = this.choose.bind(this);
        this.chooseColor = this.chooseColor.bind(this);
        this.saveGroup = this.saveGroup.bind(this);
        this.selectObject = this.selectObject.bind(this);
        this.clearCanvas = this.clearCanvas.bind(this);
        this.removeWhiteSpace = this.removeWhiteSpace.bind(this);
	}
    //Global Canvas variable
    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    onRangeChange(value){
        this.setState({range:value})
    }

    //Added so canvas would not rerender on props change
    
    shouldComponentUpdate(nextProps, nextState){
        console.log("Something Changed");
        if (nextState.modalIsOpen != this.state.modalIsOpen){
            return true;
        }
        if (nextState.text != this.state.text){
            return true;
        }
        if (nextState.range != this.state.range){
            return true;
        }
        if (nextProps.images != null && this.state.canvas !=null){
            if (this.props.size == nextProps.size){
                this.drawImage(nextProps.images);
            }
        }
        return false;
    }   
    
    componentDidMount(){
        var canvas = new fabric.Canvas('c', {
        isDrawingMode: false,
        });
        this.setState({
            canvas});           
    }

    selectObject(id){
        var canvas = this.state.canvas;
        canvas.setActiveObject(canvas.item(id));
    }
    
    buttonClick(){ 
        var canvas = document.getElementById("c"); 
        var activeCanvas = this.state.canvas; 
        activeCanvas.discardActiveObject();
        activeCanvas.deactivateAll().renderAll();
        var ctx = canvas.getContext('2d');
        var image = canvasToImage(ctx,canvas,this.props.maxSize);
        this.props.previewClicked(image.src,image.width,image.height);
    }
    
    saveButton(){        
        var canvas = document.getElementById("c"); 
        var activeCanvas = this.state.canvas; 
        activeCanvas.discardActiveObject();       
        var ctx = canvas.getContext('2d');
        var img = canvasToImage(ctx,canvas,this.props.size);
        //if (img != null){
          //  window.open(img.src);
        //}
        var saved = saveRenderedCanvas(img.src);
        if (saved== true){
            alert("Your image has been saved");
        }
    }
    
    drawImage(image){
        var canvas = this.state.canvas;
        var image_number = this.state.image_number;
        this.state.image_number = this.state.image_number + 1;

        fabric.Image.fromURL(image, function(oImg){
            oImg.id = image_number;
            canvas.add(oImg);
        });        
    } 
    
    moveObjectForward(){
        var canvas = this.state.canvas;
        var object = canvas.getActiveObject();
        if (object!= null){    
            var zindex = canvas.getObjects().indexOf(object);
            var id = object.get('id');
            canvas.bringForward(object);
            var new_zindex = canvas.getObjects().indexOf(object);
            if (zindex != new_zindex){
                this.props.imageUp(new_zindex, id);
            }
        }
    }
    
    moveObjectBackward(){
        var canvas = this.state.canvas;
        var object = canvas.getActiveObject();
        if (object != null){    
            var zindex = canvas.getObjects().indexOf(object);
            var id = object.get('id');
            canvas.sendBackwards(object);
            var new_zindex = canvas.getObjects().indexOf(object);
            if (zindex != new_zindex){
                this.props.imageDown(new_zindex, id);
            }
        }
    }

    deleteActiveObject(){
        var canvas = this.state.canvas;
        var object = canvas.getActiveObject();
        if (object!=null){
            var id = object.get('id');
            var zindex = canvas.getObjects().indexOf(object);
            this.props.imageDelete(zindex, id);
            object.remove();
        }
    }

    addText(){
        var canvas = this.state.canvas;
        var image_number = this.state.image_number;
        this.state.image_number = this.state.image_number + 1;
        canvas.add(new fabric.IText('Tap and type text here', { 
          fontFamily: 'arial black',
          fontSize: 20,
          left: 100, 
          top: 100 ,
          id: image_number
        }));
    }

    selectColor(){
        var canvas = this.state.canvas;
        var object = canvas.getActiveObject();

        var filter = new fabric.Image.filters.Tint({
            color: cHex,
            opacity: alpha
        });

        if(object != null && object.get('type') == 'i-text'){
            object.setFill(cHex);
            canvas.renderAll();
        }
        else if (object!= null){
            object.setFill(cHex);
            object.filters.push(filter);
            object.applyFilters(canvas.renderAll.bind(canvas));
            canvas.renderAll();
        }
    }

    setHalo(){
        var canvas = this.state.canvas;
        var object = canvas.getActiveObject();
        if (object != null){
            object.setShadow({color: cHex, blur: 100 });
            canvas.renderAll();
        }

    }

    clearCanvas(){
        var canvas = this.state.canvas;
        var object = canvas.getActiveObject();
        canvas.clear();
        canvas.renderAll();
        this.props.canvasClear();
    }

    removeWhiteSpace(){
        var canvas = this.state.canvas;
        var object = canvas.getActiveObject();
        var whiteFilter = new fabric.Image.filters.RemoveWhite({
              threshold: 40,
              distance: 140
        });
        if (object!= null){
            object.setFill(cHex);
            object.filters.push(whiteFilter);
            object.applyFilters(canvas.renderAll.bind(canvas));
            canvas.renderAll();
        }
    }

    chooseColor(c){
        cHex = c.hex;
        rgb = c.rgb;
        alpha = c.rgb.a;
        var canvas = this.state.canvas;
        var object = canvas.getActiveObject();
        var filter = new fabric.Image.filters.Tint({
            color: c.hex,
            opacity: 1.0
        });
        var whiteFilter = new fabric.Image.filters.RemoveWhite({
              threshold: 40,
              distance: 140
        });
        if(colorMode == "interior"){
            if(object != null && object.get('type') == 'i-text'){
                object.setFill(c.hex);
                canvas.renderAll();
            }
            else if (object!= null){
                object.setFill(c.hex);
                object.filters.push(whiteFilter);
                object.filters.push(filter);
                object.applyFilters(canvas.renderAll.bind(canvas));
                canvas.renderAll();
            }

        }else if(colorMode == "halo"){
            if (object != null){
            object.setShadow({color: c.hex, blur: 100 });
            canvas.renderAll();
            }
        }
        
    }

    enterDrawingMode(){
        var canvas = this.state.canvas;
        canvas.isDrawingMode = !canvas.isDrawingMode;
        
        if(this.state.text == "Freehand Off"){
            this.setState({text : "Freehand On"});
        }
        else{
            this.setState({text : "Freehand Off"});
        }
        canvas.renderAll();
    }
    
    saveGroup(){
        var canvas = document.getElementById("c"); 
        var activeCanvas = this.state.canvas; 
        activeCanvas.discardActiveObject();       
        var ctx = canvas.getContext('2d');        
        var num = document.getElementById("group_num").value;
        if (num < 2 || num > 20){
            alert("Please choose a number between 2 and 20");
        }else{
            var range = this.state.range;
            var sizes = [range[0]]
            var inc = Math.round((range[1]-range[0])/(num-1));
            for (var i=1; i < num-1; i++){
                sizes.push(range[0]+i*inc)
            }
            sizes.push(range[1])
            for(i=0; i< num; i++){
                var data = canvasToImage(ctx,canvas,sizes[i]);
                saveRenderedCanvas(data);
            }
            alert(num + ' Push pins have been saved with sizes between ' + range[0] + ' and ' + range[1]);
            this.closeModal();   
        }       
    }
    
    
    choose () {
         showPicker = true;
    }
    render() {
        
        return (
            <div>
                
                <div className = "image-list" style = {{height: 300, width: 150, float: 'left', borderWidth: 1, borderStyle: 'solid', borderColor: '#13496e', marginLeft: 0.45}}>
                    <LayerTree />
                </div>
                <div className = "canvas" style = {{height: 300, width: 300, float: 'left', borderWidth: 1, borderStyle: 'solid', borderColor: '#13496e'}}>
                    <canvas id = "c" width={300} height={300}></canvas>   
                </div>
                <div style = {{height: 300, width: 221, float: 'left', borderStyle: 'solid', borderWidth: 1, borderColor: '#13496e', marginLeft: 0}}><SketchPicker color={ 'black' } onChange={ this.chooseColor }/></div>
                <div className = "buttons" style = {{height: 30, width: 750, float:'none'}}>
                    <button onClick = {this.saveButton}>Save Image</button>
                    <button onClick = {this.buttonClick}>Preview</button> 
                    <button onClick = {this.openModal}>Create Group</button>
                    <Modal
                        isOpen = {this.state.modalIsOpen}
                        onAfterOpen = {this.afterOpenModal}
                        onRequestClose = {this.closeModal}
                        style = {customStyles}
                        contentLabel = "Example Modal"
                    >
                    <div style = {{padding:'2px 16px', 'backgroundColor':'#13496e',color: 'white'}}>
                        <p>Create Group Based on Size</p>            
                    </div>      
                                 
                    <div style = {{padding:'2px 16px','fontSize':'12px'}}>               
                        <p>Min = {this.state.range[0]}px</p>
                       <Range id= "group_range" allowCross={false} min={5} max={100} defaultValue={[25,75]} onChange={this.onRangeChange}/>
                        <p>Max = {this.state.range[1]}px</p>
                        Number of Pins: <input id = "group_num" type="number" min="2" max = "100"></input>
                    </div>
                    <div style = {{padding:'2px 16px'}}>
                        <button onClick={this.closeModal}>Cancel</button>
                        <button onClick={this.saveGroup}>Save</button>
                    </div>
                    </Modal>
                    <button onClick = {this.moveObjectForward}>Bring Forward</button>
                    <button onClick = {this.moveObjectBackward}>Send Backward</button>
                    <button onClick = {this.deleteActiveObject}>Delete Object</button>
                    <button onClick = {this.addText}>Add Text</button>
                    <button onClick = {this.selectColor}>Color Fill</button>
                    <button onClick = {this.setHalo}>Set Halo</button>
                    <button onClick = {this.enterDrawingMode}>{this.state.text}</button>
                    <button onClick = {this.clearCanvas}>Clear Canvas</button>
                    <button onClick = {this.removeWhiteSpace}>Remove Object WhiteSpace</button>
                </div>  
            </div>          
        );
    }
}

FabricCanvas.propTypes = {

	images: PropTypes.string,
    previewClicked: PropTypes.func.isRequired,
    imageUp: PropTypes.func.isRequired,
    imageDown: PropTypes.func.isRequired,
    imageDelete: PropTypes.func.isRequired,
    canvasClear: PropTypes.func.isRequired,
    size: PropTypes.number,
    maxSize: PropTypes.number,
    select_id: PropTypes.number.isRequired
}

FabricCanvas.defaultProps = {

	images: [],
    previewClicked: (dataURL,sizeX,sizeY) => console.log("Clicked on preview"),
    imageUp: (zindex, object) => console.log("zindex is"+zindex),
    imageDown: (zindex) => console.log("zindex is"+zindex),
    imageDelete: (zindex, object) => console.log("zindex is"+zindex),
    canvasClear: () => console.log("canvas cleared"),
    select_id: 0,
    maxSize: 100

}

function mapDispatchToProps(dispatch) {
    return ({
        previewClicked: (dataURL,sizeX,sizeY) => {dispatch(previewImage(dataURL,sizeX,sizeY))},
        imageUp: (zindex, object) => {dispatch(imageBroughtUp(zindex, object))},
        imageDown: (zindex, object) => {dispatch(imageSentDown(zindex, object))},
        imageDelete: (zindex, object) => {dispatch(imageDeleted(zindex, object))},
        canvasClear: () => {dispatch(canvasCleared())}
    })
}


const mapStateToProps = (state) => {
	return {
		images:state.library.src,
        size: state.slider.value,
		color: state.color.color,
        select_id: state.preview.selection
	}
}

const FabricContainer = connect(mapStateToProps, mapDispatchToProps)(FabricCanvas); 

export default FabricContainer;