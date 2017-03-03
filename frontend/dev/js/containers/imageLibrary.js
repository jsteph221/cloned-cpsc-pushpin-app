import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {hashHistory} from 'react-router';
import $ from 'jquery';

import UploadForm from './uploadForm';
import server from '../config/server';
import {selectImage} from '../actions';

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
        this.state = {
            projects: [], 
            customImages: []
        };
	};

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
		var imgs = [];
		var request = new XMLHttpRequest();
        request.withCredentials = true;
        
        request.open('GET',server+'/api/standard/base', false);
		request.send(null); 
    
        if (request.status !== 200){
            alert("synchronous request failed\n Error: "+request.status);
            return [];
        }

		var resp = JSON.parse(request.response);
        
        return resp.images;
	};

	getInteriorImages(){
        var imgs = [];
		var request = new XMLHttpRequest();
        request.withCredentials = true;
        
        request.open('GET',server+'/api/standard/interior', false);
		request.send(null); 
    
        if (request.status !== 200){
            alert("synchronous request failed\n Error: "+request.status);
            return [];
        }

		var resp = JSON.parse(request.response);
        
        return resp.images;
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

        {/*
        this.setState({projects: response.projects});
        */}

        return response.projects;

    }

    mapToImage(imageURLs){

        return imageURLs.map((url) => <img src={url} onClick={() => this.imageClick(url)} style={{height: 50, width: 50, padding: 10}} />);

    }

    render() {

        const customImages = this.mapToImage(this.getCustomImages());
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
                    <p>{customImages}</p>
                    <div className = "uploadForm">
                        <UploadForm />
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