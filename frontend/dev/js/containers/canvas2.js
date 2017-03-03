import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {Canvas, Text, Image} from 'react-fabricjs';
import {fabric} from 'fabric-webpack'
import $ from 'jquery'
import {previewImage} from '../actions'

// Fabric part
var fabricCanvas = new fabric.Canvas();

// class which takes care about instantiating fabric and passing state to component with actual canvas
class FabricCanvas extends Component{

   constructor(props){
      super(props);
      this.canvasUpdate = this.canvasUpdate.bind(this);
   }

   canvasUpdate(){
      this.props.canvasChange();
   }

   componentDidMount() {
			// we need to get canvas element by ref to initialize fabric
         var el = this.refs.canvasContainer.refs.objectsCanvas;
         fabricCanvas.initialize(el, {
            height: 400,
            width: 800,
         });
			// initial call to load objects in store and render canvas
         this.refs.canvasContainer.loadAndRender();
			
         fabricCanvas.on('mouse:up', () => {
            this.canvasUpdate();
            this.refs.canvasContainer.loadAndRender();
         });
      }

      render(){
         return (
				<div>
					{/* send store and fabricInstance viac refs (maybe not the cleanest way, but I was not able to create global instance of fabric due to use of ES6 modules) */}
            	<CanvasContainer ref="canvasContainer" canvasObjectState={this.props.objects} fabricInstance={fabricCanvas}/>
				</div>
         )
      }
}

function mapStateToProps(store) {
   return ({
      objects: store.canvasObjectState
   })
}

function mapDispatchToProps(dispatch) {
    return ({
        canvasChange: () => {dispatch({
               type: 'OBJECTS_CANVAS_CHANGE',
               payload: {
                  // send complete fabric canvas object to store
                  canvasObject: fabricCanvas.toObject(),
                  // also keep lastly active (selected) object
                  selectedObject: fabricCanvas.getObjects().indexOf(fabricCanvas.getActiveObject())
               }
            })}
    })
}

class CanvasContainer extends Component{

   constructor(props){
      super(props);
      this.loadAndRender = this.loadAndRender.bind(this);
   }

   loadAndRender(){
      var fabricCanvas = this.props.fabricInstance;
		fabricCanvas.loadFromJSON(this.props.canvasObjectState.canvasObject);
		fabricCanvas.renderAll();
		// if there is any previously active object, we need to re-set it after rendering canvas
		var selectedObject = this.props.canvasObjectState.selectedObject;
		if (selectedObject > -1) {
			fabricCanvas.setActiveObject(fabricCanvas.getObjects()[this.props.canvasObjectState.selectedObject]);
		}
   }

   render() {
      this.loadAndRender();
      return ( 
			<canvas ref="objectsCanvas">
         </canvas>
      )
   }
}

const FabricCanvasReduxed = connect(mapStateToProps, mapDispatchToProps)(FabricCanvas);

export default FabricCanvasReduxed;