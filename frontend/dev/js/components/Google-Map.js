import React from 'react'
import ReactDOM from 'react-dom'
import Map, {InfoWindow,Marker,GoogleApiWrapper} from 'google-maps-react'

const Container = React.createClass({
    getInitialState: function() {
        return {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
    },

    onMapMoved: function(props, map) {
        //const center = map.center;
    },

    onMarkerClick: function(props, marker) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    },

    onMapClicked: function(props) {

    },

    render: function() {
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }

        return (
            <Map google={this.props.google}
                 style={{width: '100%', height: '100%', position: 'relative'}}
                 className={'map'}
                 initialCenter= {{
                    lat:49.2820,
                    lng:-123.1171
                    }}
                 zoom={14}
                 containerStyle={{}}
                 draggable={false}
                 panControl={false}
                 streetViewControl={true}
                 centerAroundCurrentLocation={false}
                 onClick={this.onMapClicked}
                 onDragend={this.onMapMoved}
                >
                <Marker icon={'./icons/costcowholesalecorp.png'} position={{lat:49.2800, lng:-123.1171}} />
                <Marker icon={'./icons/thehomedepot.png'} position={{lat:49.2820, lng:-123.1171}} />
                <Marker icon={'./icons/toysrus.png'} position={{lat:49.2840, lng:-123.1171}} />
            </Map>
        )
    }
});
//<Marker onClick={this.onMarkerClick} name={'Current location'} />

export default Container;
/**
 * Created by Sven on 2/5/2017.
 */
