import React from 'react';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';
import Canvas from '../containers/canvas';
import FabricCanvasReduxed from '../containers/canvas2';
import Toolbar from '../containers/toolbar';
import ImageLibrary from '../containers/imageLibrary';
import PreviewMap from '../containers/map';
import UploadForm from '../containers/uploadForm';
import SizeSlider from '../containers/slider'
import InteriorColorPicker from '../containers/interiorColorPicker';
import $ from 'jquery';


require('../../scss/style.scss');

var windowWidth = $(window).width();
var windowHeight = $(window).height();

const MainApp = () => (
    <div className = "mainScreen" style = {{height: windowHeight*0.99, width: windowWidth*0.98}}>

            <div className="title" style = {{height: windowHeight*0.05, width: windowWidth*0.98}}>
                    <hr />
                    Pushpin Creator
            </div>

            <div>
                    <FabricCanvasReduxed />
            </div>

            <div className = "map" style = {{height: windowHeight * 0.45, width: windowWidth * 0.46}}>
                    <PreviewMap />
            </div>


            <div className="map" style = {{height: windowHeight * 0.18, width: windowWidth * 0.46}}>
                <SizeSlider/>
            </div>

            <div>
                    <InteriorColorPicker/>
            </div>

            <div className = "imageLibrary" style = {{height: windowHeight * 0.37, width: windowWidth * 0.93}}>
                <ImageLibrary />
            </div>

            <div className = "bottomBar" style = {{height: windowHeight*0.02, width: windowWidth*0.96}}>
            </div>



    </div>
);

export default MainApp;
