import React from 'react';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';
import Canvas from '../containers/canvas';
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
    <div className = "mainScreen" style = {{height: 600, width: 979, borderWidth: 0.5, borderStyle: 'solid', borderColor: '#13496e'}}>

            <div className="title" style = {{paddingTop: 3, paddingleft: 10, height:28, width: 980}}>    
                    <p style = {{marginTop: 3, marginLeft: 10}}>Pushpin Creator</p>
            </div>

            <div>
                    <Canvas />
            </div>

            <div className = "map" style = {{marginTop: -30, marginLeft: 0, marginRight: -10, height: 300, width: 300, borderWidth: 0.5, borderStyle: 'solid', borderColor: '#13496e'  }}>
                    <PreviewMap />
            </div>


            <div className = "imageLibrary" style = {{height: 235, width: 978, marginLeft: 1.5, float:'left'}}>
                <ImageLibrary />
            </div>

            <div className = "bottomBar" style = {{height: 1, width: 978}}>
            </div>



    </div>
);

export default MainApp;
