import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {hashHistory} from 'react-router';
import $ from 'jquery';

import NameForm from './uploadForm';

const server = 'http://localhost:3030';

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class ImageLibrary extends Component {
	constructor(props){
		super(props);
		this.getBaseImages = this.getBaseImages.bind(this);
		this.getInteriorImages = this.getInteriorImages.bind(this);
	}

	componentWillMount(){
        $.ajax(
        {
            url : server+"/api",
            type : "GET",
            dataType: "json",
            xhrFields: {
               withCredentials: true
            },
            crossDomain: true,
            success : function(data) {
                if (data.success != true){
                    hashHistory.push("/login");
                }
            }
        })
        .fail(
            function(data, status) { 
                hashHistory.push("/login");
            }
        ); 
    }

	handleTabSelect(index, last){
		console.log("index "+index+" selected");
	};

	getBaseImages(){
		{/*
			TODO: Add ajax request to backend
		*/}
		return ['http://www.clker.com/cliparts/n/x/o/K/u/Y/pushpin-google-yelow.svg', 'http://www.clipartkid.com/images/549/blue-push-pin-clip-art-at-clker-com-vector-clip-art-online-royalty-Lvbj1h-clipart.png'];
	};

	getInteriorImages(){
		{/*
			TODO: Add ajax request to backend
		*/}
		return ['http://images.clipartpanda.com/airplane-clipart-no-background-blue-plane-md.png', 'https://img.clipartfest.com/580b33ee35104002fb7ac1d9728b8e3b_chicken-burger-clipart-free-burger-clipart-no-background_1024-875.jpeg'];
	};

    render() {
		const baseImages = this.getBaseImages().map((url) => <img src={url} style={{height: 100, width: 100}} />);
		const interiorImage = this.getInteriorImages().map((url) => <img src={url} style={{height: 100, width: 100}} />);

        return (
		<div>
            <Tabs>
            	<TabList>
            		<Tab>Base Images</Tab>
            		<Tab>Interior Images</Tab>
                    <Tab>Image Upload </Tab>
            	</TabList>

            	<TabPanel>
            		<p>Base images</p>
            		<p>{baseImages}</p>
            	</TabPanel>

            	<TabPanel>
            		<p>Interior images</p>
            		<p>{interiorImage}</p>
            	</TabPanel>

                <TabPanel>
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