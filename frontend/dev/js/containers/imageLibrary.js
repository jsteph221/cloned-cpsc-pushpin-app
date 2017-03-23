import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {hashHistory} from 'react-router';
import $ from 'jquery';

import server from '../config/server';
import {selectImage} from '../actions';

//image upload
import Dropzone from 'react-dropzone';

import SizeSlider from '../containers/slider'

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class ImageLibrary extends Component {

	constructor(props){
        super(props);
		this.getBaseImages = this.getBaseImages.bind(this);
		this.getInteriorImages = this.getInteriorImages.bind(this);
        this.getCustomImages = this.getCustomImages.bind(this);
        this.getRenderedImages = this.getRenderedImages.bind(this);
        this.getProjects = this.getProjects.bind(this);
        this.imageClick = this.imageClick.bind(this);
        this.mapToImage = this.mapToImage.bind(this);
        
        
        //image upload
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.postImage = this.postImage.bind(this);
        
        this.state = {
            projects: [], 
            customImagesLibrary: this.mapToImage(this.getCustomImages()),
            renderedImagesLibrary: this.mapToImage(this.getRenderedImages()),
        };
	};

    
    
    //implement if needed
    componentDidMount(){     
    }
    
       
    //AJAX to post image
    postImage(files) {
        var server = 'http://localhost:3030';
        const self = this;

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
                                alert("A custom image has been submitted and created with id: " + id);
                                
                                //update custom images in state
                                self.setState({
                                    customImagesLibrary: self.mapToImage(self.getCustomImages())
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
    
    //handle dropped file  
    onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
      alert("dropped");        
      this.postImage(acceptedFiles);            
    }
    
    //upload file with button
    handleSubmit(e) {
        e.preventDefault();       
        this.postImage(document.getElementById('imageForm').files); 
    }
    
    
    
    imageClick(url){ 
        this.props.imageClicked(url);
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

	getBaseImages(){
        var request = new XMLHttpRequest();

        request.withCredentials = true;

        request.open('GET',server+'/api/standard/base', false);
		request.send(null); 

        var response = JSON.parse(request.response);

        if (request.status !== 200){
            alert("synchronous request failed\n Error: "+request.status);
            return [];
        }

        {/*
        this.setState({customImages: response.customImages});  
        */}

        var result = [];
        //error when no project of given id ->Cannot read property 'map' of undefined
	    if (response.success == true){
		    result = response.keys.map((key) => server+"/api/standard/base/?key="+key);
	    }
        return result;
	};

	getInteriorImages(){
        var request = new XMLHttpRequest();

        request.withCredentials = true;

        request.open('GET',server+'/api/standard/interior', false);
		request.send(null); 

        var response = JSON.parse(request.response);

        if (request.status !== 200){
            alert("synchronous request failed\n Error: "+request.status);
            return [];
        }

        {/*
        this.setState({customImages: response.customImages});  
        */}

        var result = [];
        //error when no project of given id ->Cannot read property 'map' of undefined
	    if (response.success == true){
		    result = response.keys.map((key) => server+"/api/standard/interior/?key="+key);
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

        {/*
        this.setState({customImages: response.customImages});  
        */}

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
		    result = response.renderedImages.map((imageID) => server+"/api/projects/"+proj+"/renderedImages/"+imageID);
	    }        
        
        return result;
    }

    getProjects(){

        var request = new XMLHttpRequest();

        /*request.withCredentials = true;*/

        request.open("GET", server+"/api/projects", false);
        request.send(null);

        var response = JSON.parse(request.response);

        if (request.status !== 200){
            alert("synchronous request failed\n Error: "+request.status);
            return [];
        }

        {/*
        this.setState({projects: response.projects});
        */}

        return response.projects;

    }

    mapToImage(imageURLs){

        return imageURLs.map((url) =>                              
                             <img src={url}  onClick={() => this.imageClick(url)} style={{height: 20, width: 20, padding: 10}} />);

    }

    render() {

        
        const baseImages = this.mapToImage(this.getBaseImages());
        const interiorImages = this.mapToImage(this.getInteriorImages());
        
        const imagesFn = ((im) => this.mapToImage(im)).bind(this);

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
            		<p>{baseImages}</p>
            	</TabPanel>

            	<TabPanel>
            		<p>{interiorImages}</p>
            	</TabPanel>

                <TabPanel>
                    <div className = "uploadForm">                
                        <Dropzone onDrop={this.onDrop} style={{height: 150, width: 976, backgroundColor: "#f2f2f2", marginTop: 0}}>
                             {this.state.customImagesLibrary}
                             <div style={{marginLeft : 5}}>
                                 <input id="imageForm" name="customImage" type="file" accept=".svg, .jpg, .png"/>            
                                 <button value="Upload" onClick={this.handleSubmit}>Upload</button>
                             </div>
                             
                          </Dropzone>
                    </div>
                </TabPanel>
            
                <TabPanel>
                    <p>{this.state.renderedImagesLibrary}</p>
                </TabPanel>
                <TabPanel>
            		 <SizeSlider/>
            	</TabPanel>



            </Tabs>
		</div>
        );
    }
}

ImageLibrary.propTypes = {
    imageClicked: PropTypes.func.isRequired
}

ImageLibrary.defaultProps = {
    imageClicked: (image) => console.log(image+" was clicked\n")
}

function mapDispatchToProps(dispatch) {
    return ({
        imageClicked: (url) => {dispatch(selectImage(url))}
    })
}


const LibraryContainer = connect(null, mapDispatchToProps)(ImageLibrary);

export default LibraryContainer;