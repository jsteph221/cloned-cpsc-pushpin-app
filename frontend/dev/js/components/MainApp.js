import React from 'react';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';
import Canvas from '../containers/canvas';
import Toolbar from '../containers/toolbar';
import ImageLibrary from '../containers/imageLibrary';
import PreviewMap from '../containers/map';
import UploadForm from '../containers/uploadForm';
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
                    <Canvas />
            </div>

            <div className = "map" style = {{height: windowHeight * 0.45, width: windowWidth * 0.46}}>
                    <PreviewMap />
            </div>

            <div className = "imgToolBar" style = {{height: windowHeight * 0.37, width: windowWidth * 0.47}}>
                    <Toolbar />
            </div>

            <div className = "imageLibrary" style = {{height: windowHeight * 0.37, width: windowWidth * 0.46}}>
                    <ImageLibrary />

            </div>
            <div className = "uploadForm">
                    <UploadForm />
            </div>
            <div className = "bottomBar" style = {{height: windowHeight*0.02, width: windowWidth*0.96}}>
            </div>

    </div>
);

export default MainApp;
