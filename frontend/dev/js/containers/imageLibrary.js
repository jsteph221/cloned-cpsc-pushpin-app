import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ReactScrollbar from 'react-scrollbar-js';
import {hashHistory} from 'react-router';
import $ from 'jquery';

import server from '../config/server';
import {selectImage,selectRendered,previewImage} from '../actions';
import ReactTooltip from 'react-tooltip';

import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

//image upload
import Dropzone from 'react-dropzone';

import SizeSlider from '../containers/slider'

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class ImageLibrary extends Component {

    constructor(props){
        super(props);

        this.getDefaultImages = this.getDefaultImages.bind(this);
        this.getCustomImages = this.getCustomImages.bind(this);
        this.getRenderedImages = this.getRenderedImages.bind(this);
        this.getProjects = this.getProjects.bind(this);
        this.addJson = this.addJson.bind(this);
        this.getDownload = this.getDownload.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.deleteCustom = this.deleteCustom.bind(this);
        this.imageClick = this.imageClick.bind(this);

        this.mapToImage = this.mapToImage.bind(this);
        this.mapToImageRendered = this.mapToImageRendered.bind(this);
        this.mapToImageCustom = this.mapToImageCustom.bind(this);
        this.handleClickRendered = this.handleClickRendered.bind(this);
        this.handleClickCustom = this.handleClickCustom.bind(this);
        


        //image upload
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.postImage = this.postImage.bind(this);

        this.state = {
            projects: [],
            customImagesLibrary: this.mapToImageCustom(this.getCustomImages()),
            image_number: 0,
            baseImagesLibrary:this.mapToImage(this.getDefaultImages('base')),
            interiorImagesLibrary:this.mapToImage(this.getDefaultImages('interior')),
            renderedImagesLibrary: this.mapToImageRendered(this.getRenderedImages()),
            activeJsonKey:"",
        };
    };
    handleClickRendered(e, data,target) {
        var action = data.action;
        var url = target.getElementsByTagName('img')[0].src;
        if (action == "add" && url){
            this.addJson(url)
        }else if(action == "download" && url){
            this.getDownload(url);
        }else if(action == "delete" && url){
            this.deleteImage(url);
        }else if(action == "open" && url){
            window.open(url);
        }else if(action == "preview" && url){
            var self= this;
            var img = new Image();
            img.onload = function(){
                self.props.previewClicked(img.src,img.width,img.height);
            }
            img.src = url;
        }
        return;
    }
    
    handleClickCustom(e,data,target) {
        var action = data.action;
        var url = target.getElementsByTagName('img')[0].src;
        if (action == "add" && url){
            var image_number = this.state.image_number;
            this.state.image_number = this.state.image_number + 1;
            this.props.imageClicked(url, image_number);        
        }else if(action == "delete" && url){
            this.deleteCustom(url);
        }
        return;
    }
    
    imageClick(url){
        var image_number = this.state.image_number;
        this.state.image_number = this.state.image_number + 1;
        this.props.imageClicked(url, image_number); 
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.new_imageKey != this.props.new_imageKey){
            this.setState({renderedImagesLibrary: this.mapToImageRendered(this.getRenderedImages())});
        }
    }

    addJson(url){
        this.props.renderedImageClicked(url);
    }

    getDownload(url){
        var defaultName = prompt("Name your image:", "myPushpin");

        if (defaultName != null){
            defaultName = defaultName+".png";
        }else return;


        var a = document.createElement("a");
        a.download = defaultName;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    
    deleteImage(url){
        var proj = this.getProjects()[0];
        var index = url.lastIndexOf('/');
        var key = url.slice(index);
        var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('DELETE',server+"/api/projects/"+proj+"/renderedImages/image"+key, false);
        request.send(null);
        var response = JSON.parse(request.response);
        if (request.status !== 200){
            alert("synchronous request failed\n Error: "+request.status);
        }
        if (response.success == true){
            this.setState({renderedImagesLibrary: this.mapToImageRendered(this.getRenderedImages())});
            alert("Image has been deleted");
        }
    }
    deleteCustom(url){
        var proj = this.getProjects()[0];
        var index = url.lastIndexOf('/');
        var key = url.slice(index);
        var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('DELETE',server+"/api/projects/"+proj+"/customImages"+key, false);
        request.send(null);
        var response = JSON.parse(request.response);
        if (request.status !== 200){
            alert("synchronous request failed\n Error: "+request.status);
        }
        if (response.success == true){
            this.setState({customImagesLibrary: this.mapToImageCustom(this.getCustomImages())});
            alert("Image has been deleted");
        }
    }

    //AJAX to post image
    postImage(files) {
        const self = this;
        var arr = files[0].name.split('.');
        var ex = arr[1];

        if (ex != null && (ex == "jpg" || ex == "png" || ex == "jpeg" || ex == "svg")) {




        /*get 1st project*/
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
                        /* create a new custom image document */
                        var customImageEndPoint = server+"/api/projects/"+project+"/customImages";
                        var file = files[0]
                        var fd = new FormData();
                        fd.append('file', file);
                        $.ajax(
                            {
                                url : customImageEndPoint,
                                type : "POST",
                                xhrFields: {
                                    withCredentials: true
                                },
                                data : fd,
                                crossDomain: true,
                                processData: false,
                                contentType: false,
                                success : function(data) {
                                    if (data.success === true){
                                        var id = data.customImages._id;
                                        alert("Your custom image is being uploaded. Depending on the size of the image, this may take several seconds.");

                                        //update custom images in state
                                        self.setState({
                                            customImagesLibrary: self.mapToImageCustom(self.getCustomImages())
                                        });

                                    }
                                    else{
                                        alert(data.message);
                                    }
                                }
                            })
                            .fail(
                                function() { alert("ajax failure");}
                            );
                    }
                    else{
                        alert(data.message);
                    }
                }
            })
            .fail(
                function() { alert("ajax failure");}
            );


            }

            else {
                alert('Please upload an image in jpg, png, or svg format.');

            }


    }

    //handle dropped file
    onDrop(acceptedFiles, rejectedFiles) {
//        alert("dropped");
        this.postImage(acceptedFiles);
    }

    //upload file with button
    handleSubmit(e) {
        e.preventDefault();
        this.postImage(document.getElementById('imageForm').files);
    }


    renderedImageClick(url){
        this.setState({activeJsonKey:url});
    }

    componentWillMount(){

        var request = new XMLHttpRequest();

        request.withCredentials = true;

        request.open("GET", server+"/api", false);
        request.send(null);

        var response = JSON.parse(request.response);

        if (response.success != true){
            hashHistory.push("/login");
        }
    }

    getDefaultImages(type){
        var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('GET',server+'/api/standard/'+type, false);
        request.send(null);
        var response = JSON.parse(request.response);
        if (request.status !== 200){
            alert("synchronous request failed\n Error: "+request.status);
            return [];
        }
        var result = [];
        //error when no project of given id ->Cannot read property 'map' of undefined
        if (response.success == true){
            result = response.keys.map((key) => server+"/api/standard/"+type+"/?key="+key);
        }
        return result;
    };

    getCustomImages(){

        var proj = this.getProjects()[0];
        var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open("GET", server+"/api/projects/"+proj+"/customImages", false);
        request.send(null);
        var response = JSON.parse(request.response);
        if (request.status !== 200){
            alert("synchronous request failed\n Error: "+request.status);
            return [];
        }

        var result = [];
        //error when no project of given id ->Cannot read property 'map' of undefined
        if (response.success == true){
            result = response.customImages.map((imageID) => server+"/api/projects/"+proj+"/customImages/"+imageID);
        }
        return result;
    }
    getRenderedImages(){
        var proj = this.getProjects()[0];
        var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open("GET", server+"/api/projects/"+proj+"/renderedImages", false);
        request.send(null);

        var response = JSON.parse(request.response);

        if (request.status !== 200){
            alert("synchronous request failed\n Error: "+request.status);
            return [];
        }

        var result = [];
        //error when no project of given id ->Cannot read property 'map' of undefined
        if (response.success == true){
            result = response.renderedImages.map((imageID) => server+"/api/projects/"+proj+"/renderedImages/image/"+imageID);
        }

        return result;
    }

    getProjects(){

        var request = new XMLHttpRequest();

        request.withCredentials = true;

        request.open("GET", server+"/api/projects", false);
        request.send(null);

        var response = JSON.parse(request.response);

        if (request.status !== 200){
            alert("synchronous request failed\n Error: "+request.status);
            return [];
        }

        return response.projects;

    }

    mapToImageCustom(imageURLs){

        const customClick = (url) => this.imageClick(url);

        return imageURLs.map((url) => 
                            <ContextMenuTrigger id="custom_context" renderTag="span" attributes={{'url':url}}>
                             <a data-tip data-for='image'><img src = {url} onClick={() => customClick(url)} className = "iconButton" style={{height: 40, width: 40, padding: 10}} /></a>
                            </ContextMenuTrigger>  
        );    
    }
        
    mapToImageRendered(imageURLs){
        return imageURLs.map((url) => 
                            <ContextMenuTrigger id="rendered_context" renderTag="span" attributes={{'url':url}}>
                             <a data-tip data-for='image'><img src = {url} className = "iconButton" style={{height: 20, width: 20, padding: 10}} /></a>
                            </ContextMenuTrigger>        
        );
    }
    mapToImage(imageURLs){

        return imageURLs.map((url) => 
                             <img src={url}  onClick={() => this.imageClick(url)} style={{height: 40, width: 40, padding: 10}} />          
        );      
    }

    render() {

        return (
            <div>
                <Tabs>
                    <TabList>
                        <Tab style={{color:'dimgrey', fontSize: 14}}>Base Images</Tab>
                        <Tab style={{color:'dimgrey', fontSize: 14}}>Interior Images</Tab>
                        <Tab style={{color:'dimgrey', fontSize: 14}}>Custom Images </Tab>
                        <Tab style={{color:'dimgrey', fontSize: 14}}>Push Pins </Tab>
                        <Tab style={{color:'dimgrey', fontSize: 14}}>Choose Pushpin Size</Tab>
                    </TabList>

                    <TabPanel>
                        <ReactScrollbar style = {{height: 190, width: 978}}>
                            <div>
                                {this.state.baseImagesLibrary}
                            </div>
                        </ReactScrollbar>
                    </TabPanel>

                    <TabPanel>
                        <ReactScrollbar style = {{height: 190, width: 978}}>
                            <div>
                                {this.state.interiorImagesLibrary}
                            </div>
                        </ReactScrollbar>
                    </TabPanel>

                    <TabPanel>
                            <div className = "uploadForm">
                                <Dropzone onDrop={this.onDrop} style={{height: 125, width: 976, backgroundColor: "#f2f2f2", marginTop: 0}}>
                                    <ReactScrollbar style = {{height: 120, width: 976}}>
                                        <div>
                                            {this.state.customImagesLibrary}
                                        </div>
                                    </ReactScrollbar>
                                    <div style={{marginLeft : 5, marginTop: 10}}>
                                        Please drop above or click below to upload.
                                    </div>
                                    <div style={{marginLeft : 5, marginTop: 5}}>
                                        <input id="imageForm" name="customImage" type="file" accept=".svg, .jpg, .png"/>
                                        <button value="Upload" onClick={this.handleSubmit}>Upload</button>
                                    </div>
                                </Dropzone>
                            </div>
                    </TabPanel>

                    <TabPanel>
                        <ReactScrollbar style = {{height: 190, width: 978}}>
                            <div>
                                {this.state.renderedImagesLibrary}
                            </div>
                        </ReactScrollbar>
                    </TabPanel>

                    <TabPanel>
                    <div>
                        <SizeSlider/>
                    </div>
                    </TabPanel>      

                </Tabs>
                <ReactTooltip id='image' type='warning'>
                      <span>Right Click for Image Options</span>
                    </ReactTooltip>
                <ContextMenu id="rendered_context">
                    <MenuItem data={{ action: 'add' }} onClick={this.handleClickRendered}>
                      Load Into Canvas
                    </MenuItem>
                     <MenuItem divider />
                    <MenuItem data={{ action: 'download' }} onClick={this.handleClickRendered}>
                      Download
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{ action: 'delete' }} onClick={this.handleClickRendered}>
                      Delete
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{ action: 'open' }} onClick={this.handleClickRendered}>
                      Open
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{ action: 'preview' }} onClick={this.handleClickRendered}>
                      View On Map
                    </MenuItem>
                  </ContextMenu>
                <ContextMenu id="custom_context" style={{backgroundColor   : 'rgba(0, 0, 0, 0.5)'}}>
                    <MenuItem data={{ action: 'add' }} onClick={this.handleClickCustom}>
                      Add To Canvas
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{ action: 'delete' }} onClick={this.handleClickCustom}>
                      Delete
                    </MenuItem>
                  </ContextMenu>
            </div>
        );
    }
}

ImageLibrary.propTypes = {
    imageClicked: PropTypes.func.isRequired,
    renderedImageClicked: PropTypes.func.isRequired,
    previewClicked: PropTypes.func.isRequired,
}

ImageLibrary.defaultProps = {
    imageClicked: (image, id) => (e),
    renderedImageClicked: (image) => (e),
    previewClicked: (dataURL,sizeX,sizeY) => (e),
}

function mapDispatchToProps(dispatch) {
    return ({
        imageClicked: (url, id) => {dispatch(selectImage(url, id))},
        renderedImageClicked: (url) => {dispatch(selectRendered(url))},
        previewClicked: (dataURL,sizeX,sizeY) => {dispatch(previewImage(dataURL,sizeX,sizeY))},
    })
}

const mapStateToProps = (state) => {
    return {
        new_imageKey: state.canvas.new_imageKey
    }
}


const LibraryContainer = connect(mapStateToProps, mapDispatchToProps)(ImageLibrary);

export default LibraryContainer;