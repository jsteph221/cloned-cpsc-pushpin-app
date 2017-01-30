// import React from 'react';
// import UserList from '../containers/user-list';
// import UserDetails from '../containers/user-detail';
// 


// const App = () => (
//     <section className = "mainApp">
    	

//     	<div className = "toolbar">
//     		Toolbar here
//     	</div>

//     	<div className = "fabricApp">
//     		Insert canvas here
//         </div>

//         <div className = "mapApp">
//         	Insert map here
//         </div>
//     </section>
// );



// export default App;


import React from 'react';
import {Canvas, Text} from 'react-fabricjs';
require('../../scss/style.scss');

const HelloFabric = React.createClass({
  render: function() {
    return (
    		<section className = "mainApp">

    			<div className = "fabricApp">
			      <Canvas
			        width="950"
			        height="900">
			          <Text
			            text="Fabric App!!"
			            left={300}
			            top={300}
			            fill="#000000"
			            fontFamily="Arial"
			          />
			      </Canvas>
			    </div>

			    <div className = "mapApp">
			    	Insert map here
			    </div>

		    </section>

    );
  }
});

export default HelloFabric;
