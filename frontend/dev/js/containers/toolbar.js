import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

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
		            <Tab>toolbartabs</Tab>
		            <Tab>toolbartabs</Tab>
		        </TabList>

		        <TabPanel>
		          <h2>This is Toolbar Container</h2>
		        </TabPanel>

		        </Tabs>

		        </div>
                
            </div>
        );
    }
}

export default Toolbar;