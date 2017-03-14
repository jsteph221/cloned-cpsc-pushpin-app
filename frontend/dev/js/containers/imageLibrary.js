import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {hashHistory} from 'react-router';
import $ from 'jquery';

import server from '../config/server';
import {selectImage} from '../actions';
import Dropzone from 'react-dropzone';
import cookie from 'react-cookie'



var token = cookie.load('token',true);
/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class ImageLibrary extends Component {

	constructor(props){
        super(props);
		this.getBaseImages = this.getBaseImages.bind(this);
		this.getInteriorImages = this.getInteriorImages.bind(this);
        this.getCustomImages = this.getCustomImages.bind(this);
        this.getProjects = this.getProjects.bind(this);
        this.imageClick = this.imageClick.bind(this);
        this.mapToImage = this.mapToImage.bind(this);
        
        
        //image upload
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.postImage = this.postImage.bind(this);
        
        this.state = {
            projects: [], 
            customImagesLibrary: this.mapToImage(this.getCustomImages())
        };
	};

    
    
    //implement if needed
    componentDidMount(){     
    }
    
       
    //AJAX to post image
    postImage(files) {
        //var server = 'http://localhost:3030';
        const self = this;

        /*get 1st project*/
        $.ajax(
        {
            url : server+"/api/projects?token="+token,
            type : "GET",
            xhrFields: {
               withCredentials: true
            },
            crossDomain: true,
            success : function(data) {
                if (data.success === true){
                    var project = data.projects[0];
                    /* create a new custom image document */
                    var customImageEndPoint = server+"/api/projects/"+project+"/customImages?token="+token;
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
    
    //upload file with drop zone  
    onDrop(acceptedFiles, rejectedFiles) {
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
      //alert("dropped");        
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

        request.open("GET", server+"/api?token="+token, false);
        request.send(null);

        var response = JSON.parse(request.response);

        if (response.success != true){
            hashHistory.push("/login");
        }
    }

	getBaseImages(){
        var request = new XMLHttpRequest();

        request.withCredentials = true;
        
        request.open('GET',server+'/api/standard/base?token='+token, false);
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
		    result = response.keys.map((key) => server+"/api/standard/base/?key="+key+"&token="+token);
	    }
        return result;
	};

	getInteriorImages(){
        var request = new XMLHttpRequest();

        request.withCredentials = true;
        
        request.open('GET',server+'/api/standard/interior?token='+token, false);
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
		    result = response.keys.map((key) => server+"/api/standard/interior/?key="+key+"&token="+token);
	    }
        return result;
	};

    getCustomImages(){

        var proj = this.getProjects()[0];

        var request = new XMLHttpRequest();

        request.withCredentials = true;

        request.open("GET", server+"/api/projects/"+proj+"/customImages?token="+token, false);
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
		    result = response.customImages.map((imageID) => server+"/api/projects/"+proj+"/customImages/"+imageID+"?token="+token);
	    }
        
        
        return result;
    }

    getProjects(){

        var request = new XMLHttpRequest();

        request.withCredentials = true;

        request.open("GET", server+"/api/projects?token="+token, false);
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

        return imageURLs.map((url) => <img src={url}  onClick={() => this.imageClick(url)} style={{height: 50, width: 50, padding: 10}} />);

    }

    render() {

        
        const baseImages = this.mapToImage(this.getBaseImages());
        const interiorImages = this.mapToImage(this.getInteriorImages());
        
        const imagesFn = ((im) => this.mapToImage(im)).bind(this);

        return (
		<div>
            <Tabs>
            	<TabList>
            		<Tab>Base Images</Tab>
            		<Tab>Interior Images</Tab>
                    <Tab>Custom Images </Tab>
            	</TabList>

            	<TabPanel>
            		<p>{baseImages}</p>
            	</TabPanel>

            	<TabPanel>
            		<p>{interiorImages}</p>
            	</TabPanel>

                <TabPanel>
                    <div className = "uploadForm">                
                        <Dropzone onDrop={this.onDrop} style={{height: 250, width: 1035, backgroundColor: "#f2f2f2"}}>
                            {this.state.customImagesLibrary}
                            <div style={{marginLeft : 5}}>
                                <input id="imageForm" name="customImage" type="file" accept=".svg, .jpg, .png"/>            
                                <button value="Upload" onClick={this.handleSubmit}>Upload</button>
                            </div>
                        </Dropzone>
                    </div>
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