import React from 'react';
import UserList from '../containers/user-list';
import UserDetails from '../containers/user-detail';
import Canvas from '../containers/canvas';
import Toolbar from '../containers/toolbar';
import ImageLibrary from '../containers/imageLibrary';
import Map from '../containers/map';

require('../../scss/style.scss');

const MainApp = () => (
    <div>
        <h2>User List</h2>
        <UserList />
        <hr />
        <h2>User Details</h2>
        <UserDetails />
        <Canvas />
        <Toolbar />
        <ImageLibrary />
        <Map />
    </div>
);

export default MainApp;
