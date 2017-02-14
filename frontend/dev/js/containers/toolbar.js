import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import UploadForm from './uploadForm'

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class Toolbar extends Component {
    render() {
        return (
            <div>
            	<div className = "toolBarTabs">

            	<Tabs
			        onSelect={this.handleSelect}
			        selectedIndex={0}
			      >
            	<TabList>
		            <Tab>ImageUploading</Tab>
		            <Tab>toolbartabs</Tab>
		        </TabList>

		        <TabPanel>

		          <h2>This is for image uploading</h2>
		          <div className = "uploadForm">
		          	<UploadForm />
		          </div>

		        </TabPanel>

		        </Tabs>

		        </div>
                
            </div>
        );
    }
}

export default Toolbar;