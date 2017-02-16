import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {hashHistory} from 'react-router';
import $ from 'jquery';

import NameForm from './uploadForm';
import server from '../config/server';

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
        this.mapToImage = this.mapToImage.bind(this);
        this.state = {
            projects: [], 
            customImages: []
        };
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
		{/*
			TODO: Add request to backend
		*/}
		return ['./icons/costcowholesalecorp.png', './icons/shoppingbag_grey_26.png', './icons/shoppingbag_orange28.png', './icons/shoppingbag_red28.png', './icons/thehomedepot.png', './icons/staplescanada.png', './icons/toysrus.png', './icons/zoeskitchen.png'];
	};

	getInteriorImages(){
		{/*
			TODO: Add request to backend
		*/}
		return ['http://images.clipartpanda.com/airplane-clipart-no-background-blue-plane-md.png', 'https://img.clipartfest.com/580b33ee35104002fb7ac1d9728b8e3b_chicken-burger-clipart-free-burger-clipart-no-background_1024-875.jpeg'];
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
        result = response.customImages.map((imageID) => server+"/api/projects/"+proj+"/customImages/"+imageID);

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

        return imageURLs.map((url) => <img src={url} style={{height: 50, width: 50, padding: 10}} />);

    }

    render() {
        
        const customImages = this.mapToImage(this.getCustomImages());
        const baseImages = this.mapToImage(this.getBaseImages());
        const interiorImages = this.mapToImage(this.getInteriorImages());

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
                        <NameForm />
                    </div>
                </TabPanel>



            </Tabs>
		</div>
        );
    }
}

export default ImageLibrary;